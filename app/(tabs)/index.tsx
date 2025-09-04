import useFirestoreCrud from "@/hooks/useFirestoreCrud";
import { searchAlgoliaMoalv } from "@/lib/algolia/moalvSearch";
import { ICustomer } from "@/models/customer";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Card, Searchbar } from "react-native-paper";

const CustomersScreen = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);

  const { items, loading, pagination, fetchTotal } =
    useFirestoreCrud<ICustomer>(
      "customers",
      {},
      { sortBy: "date", sortDir: "desc" }
    );

  // Cargar clientes de Algolia con búsqueda
  const fetchData = async (query: string) => {
    setLoadingSearch(true);
    try {
      const hits = await searchAlgoliaMoalv("customers", query || ""); // usa el search
      setData(hits);
    } catch (err) {
      console.error("Error al buscar clientes:", err);
    } finally {
      setLoadingSearch(false);
    }
  };

  useEffect(() => {
    fetchData(""); // carga inicial
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() =>
          router.push({
            pathname: "/customer/[id]",
            params: {
              id: item.objectID,
              name: item.name,
              photo: item.photo,
              debt: item.debt,
              email: item.email,
              phone: item.phone,
            },
          })
        }
      >
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            {/* Imagen (puede venir de item.photo o usar inicial como fallback) */}
            <Avatar.Image
              size={50}
              source={{ uri: item.image || "https://via.placeholder.com/50" }}
            />
            {/* Nombre y cantidad */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            {/* Cantidad a la derecha */}
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>{item.debt}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  // Footer con loader
  const renderFooter = () => {
    return loading || loadingSearch ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    ) : null;
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Barra de búsqueda */}
      <Searchbar
        placeholder="Buscar cliente..."
        onChangeText={(query) => {
          setSearch(query);
          fetchData(query);
        }}
        value={search}
        style={styles.searchBar}
      />

      {/* Lista de clientes */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.objectID}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    margin: 10,
    borderRadius: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  cardContainer: {
    marginVertical: 8,
    marginHorizontal: 15,
  },
  card: {
    borderRadius: 12,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // separa nombre y cantidad
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  amountContainer: {
    marginLeft: 10,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#a70715ff",
  },
  footer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomersScreen;
