import useFirestoreCrud from "@/hooks/useFirestoreCrud";
import { ICustomer } from "@/models/customer";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageViewing from "react-native-image-viewing";
import { Button, Card } from "react-native-paper";

export default function CustomerProfile() {
  const { id } = useLocalSearchParams();
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  //   useEffect(() => {
  //     if (!id) return;

  //     const unsubscribe = firestore()
  //       .collection("customers")
  //       .doc(id as string)
  //       .onSnapshot((doc) => {
  //         if (doc.exists) {
  //           setCustomer({ id: doc.id, ...(doc.data() as ICustomer) });
  //         }
  //         setLoading(false);
  //       });

  //     return () => unsubscribe();
  //   }, [id]);

  const { getById } = useFirestoreCrud<ICustomer>(
    "customers",
    {},
    { sortBy: "name", sortDir: "asc" }
  );

  const findId = async (id: string) => {
    try {
      setLoading(true);
      const res = await getById(id as string);
      setCustomer(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    findId(id as string); // carga inicial
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  if (!customer) {
    return (
      <View style={styles.center}>
        <Text>No se encontró el cliente</Text>
      </View>
    );
  }

  const { name, phone, address, reference, image, coordenada } = customer;

  // Abrir llamada telefónica
  const handleCall = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  // Abrir Google Maps
  const handleOpenMaps = () => {
    if (address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`;
      Linking.openURL(coordenada);
    }
  };

  <ImageViewing
    images={[{ uri: image || "https://via.placeholder.com/250" }]}
    imageIndex={0}
    visible={visible}
    onRequestClose={() => setVisible(false)}
  />;

  return (
    <ScrollView style={styles.container}>
      {/* Hero con zoom */}
      <View style={styles.heroContainer}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            source={{ uri: image || "https://via.placeholder.com/250" }}
            style={styles.heroImage}
          />
        </TouchableOpacity>
      </View>

      <ImageViewing
        images={[{ uri: image || "https://via.placeholder.com/250" }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />

      {/* Info */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.name}>{name}</Text>

          {phone && (
            <TouchableOpacity onPress={handleCall}>
              <Text style={styles.link}>📞 {phone}</Text>
            </TouchableOpacity>
          )}

          {address && <Text style={styles.info}>📍 Dirección: {address}</Text>}

          {reference && (
            <Text style={styles.info}>ℹ️ Referencia: {reference}</Text>
          )}

          <Button
            mode="contained"
            style={styles.mapButton}
            onPress={handleOpenMaps}
          >
            Ver en Google Maps
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  heroContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#ddd",
  },
  heroImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
  card: {
    margin: 15,
    borderRadius: 12,
    elevation: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  link: {
    fontSize: 16,
    marginBottom: 10,
    color: "#0066cc",
    textDecorationLine: "underline",
  },
  mapButton: {
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
