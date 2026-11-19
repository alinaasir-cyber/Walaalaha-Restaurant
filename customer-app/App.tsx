import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const API_BASE_URL = "http://192.168.8.93:3000"; // Replace with your production domain or local IP

export default function App() {
  const [activeTab, setActiveTab] = useState<"menu" | "cart" | "track">("menu");
  const [categories, setCategories] = useState<any[]>([]);
  const [cart, setCart] = useState<{ id: string; nameSomali: string; price: number; quantity: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/customer/menu`)
      .then((r) => r.json())
      .then((d) => {
        if (d.categories) setCategories(d.categories);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { id: item.id, nameSomali: item.nameSomali, price: Number(item.price), quantity: 1 }];
    });
    Alert.alert("Ku Daran!", `${item.nameSomali} waxaad ku dartay gaariga.`);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!customerName || !customerPhone) {
      Alert.alert("Fadlan Buuxi", "Geli magacaaga iyo taleefankaaga.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/customer/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          deliveryAddress: address,
          type: "DELIVERY",
          paymentMethod: "EVC_PLUS",
          items: cart.map((c) => ({ menuItemId: c.id, quantity: c.quantity })),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrderNumber(data.order.orderNumber);
        setCart([]);
        setActiveTab("track");
        Alert.alert("Waad Mahadsan tahay!", `Dalabkaaga #${data.order.orderNumber} waa la diiwaangeliyay.`);
      }
    } catch (e) {
      Alert.alert("Cillad", "Ma aysan suurtagelin in dalabka la diro.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>Walaalaha Restaurant</Text>
        <Text style={styles.brandSub}>Mobile Customer Food Ordering</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {activeTab === "menu" && (
          <View>
            <Text style={styles.sectionHeader}>Cuntooyinka Maanta (Menu)</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#f43f5e" style={{ marginTop: 40 }} />
            ) : (
              categories.map((cat) => (
                <View key={cat.id} style={styles.categoryBlock}>
                  <Text style={styles.catTitle}>{cat.nameSomali || cat.name}</Text>
                  {cat.menuItems?.map((item: any) => (
                    <View key={item.id} style={styles.menuCard}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.itemName}>{item.nameSomali}</Text>
                        <Text style={styles.itemSub}>{item.name}</Text>
                        <Text style={styles.itemPrice}>${Number(item.price).toFixed(2)}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => addToCart(item)}
                      >
                        <Text style={styles.addBtnText}>+ Dalbo</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ))
            )}
          </View>
        )}

        {activeTab === "cart" && (
          <View>
            <Text style={styles.sectionHeader}>Gaarigaaga Dalabka (Cart)</Text>
            {cart.length === 0 ? (
              <Text style={{ textAlign: "center", color: "#94a3b8", marginTop: 40 }}>
                Gaarigaagu hadda waa madhan yahay.
              </Text>
            ) : (
              <View>
                {cart.map((c) => (
                  <View key={c.id} style={styles.cartCard}>
                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>{c.nameSomali}</Text>
                    <Text style={{ color: "#f43f5e", fontWeight: "bold" }}>
                      {c.quantity}x (${(c.price * c.quantity).toFixed(2)})
                    </Text>
                  </View>
                ))}

                <View style={styles.formCard}>
                  <Text style={styles.formHeader}>Xogta Gaarsiinta (Delivery Info)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Magacaaga (Full Name)*"
                    value={customerName}
                    onChangeText={setCustomerName}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Taleefanka (Phone)*"
                    keyboardType="phone-pad"
                    value={customerPhone}
                    onChangeText={setCustomerPhone}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Cinwaanka Guriga / Goobta*"
                    value={address}
                    onChangeText={setAddress}
                  />

                  <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
                    Wadarta Guud: ${total.toFixed(2)}
                  </Text>

                  <TouchableOpacity style={styles.submitBtn} onPress={handleCheckout}>
                    <Text style={styles.submitBtnText}>Xaqiiji & Dalbo (EVC Plus)</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {activeTab === "track" && (
          <View style={styles.trackCard}>
            <Text style={styles.sectionHeader}>Dabagalka Dalabka</Text>
            <Text style={{ fontSize: 12, color: "#64748b", marginBottom: 15 }}>
              Dalabkaagii #${orderNumber || "WAL-10293"} si toos ah ayaa loogu diray jikada maqaayadda Walaalaha!
            </Text>

            <View style={styles.stepItem}>
              <Text style={styles.stepDotActive}>✓</Text>
              <Text style={styles.stepTextActive}>1. Dalabka waa la xaqiijiyay</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepDotActive}>✓</Text>
              <Text style={styles.stepTextActive}>2. Jikada ayaa lagu karinayaa</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepDot}>3</Text>
              <Text style={styles.stepText}>3. Dareewalkii baa soo wada</Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepDot}>4</Text>
              <Text style={styles.stepText}>4. Waa la keenay</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setActiveTab("menu")}>
          <Text style={[styles.tabText, activeTab === "menu" && styles.tabActive]}>🍽️ Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setActiveTab("cart")}>
          <Text style={[styles.tabText, activeTab === "cart" && styles.tabActive]}>
            🛒 Basket ({cart.reduce((s, c) => s + c.quantity, 0)})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => setActiveTab("track")}>
          <Text style={[styles.tabText, activeTab === "track" && styles.tabActive]}>📍 Track</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { padding: 16, backgroundColor: "#ffffff", borderBottomWidth: 1, borderBottomColor: "#e2e8f0" },
  brandTitle: { fontSize: 18, fontWeight: "900", color: "#0f172a" },
  brandSub: { fontSize: 12, color: "#f43f5e", fontWeight: "700" },
  scroll: { padding: 16, paddingBottom: 100 },
  sectionHeader: { fontSize: 18, fontWeight: "900", color: "#1e293b", marginBottom: 16 },
  categoryBlock: { marginBottom: 20 },
  catTitle: { fontSize: 14, fontWeight: "bold", color: "#f43f5e", marginBottom: 8 },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 8,
  },
  itemName: { fontSize: 13, fontWeight: "bold", color: "#1e293b" },
  itemSub: { fontSize: 11, color: "#64748b" },
  itemPrice: { fontSize: 14, fontWeight: "900", color: "#f43f5e", marginTop: 4 },
  addBtn: { backgroundColor: "#f43f5e", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  addBtnText: { color: "#ffffff", fontSize: 12, fontWeight: "bold" },
  cartCard: { flexDirection: "row", justifyContent: "space-between", padding: 12, backgroundColor: "#ffffff", borderRadius: 10, marginBottom: 6 },
  formCard: { backgroundColor: "#ffffff", padding: 16, borderRadius: 14, marginTop: 16, borderWidth: 1, borderColor: "#e2e8f0" },
  formHeader: { fontSize: 14, fontWeight: "bold", marginBottom: 12 },
  input: { backgroundColor: "#f1f5f9", padding: 10, borderRadius: 8, fontSize: 12, marginBottom: 8 },
  submitBtn: { backgroundColor: "#f43f5e", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 12 },
  submitBtnText: { color: "#ffffff", fontSize: 14, fontWeight: "bold" },
  trackCard: { backgroundColor: "#ffffff", padding: 16, borderRadius: 14, borderWidth: 1, borderColor: "#e2e8f0" },
  stepItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  stepDotActive: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#f43f5e", color: "#fff", textAlign: "center", lineHeight: 24, marginRight: 10, fontWeight: "bold", fontSize: 12 },
  stepDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#e2e8f0", color: "#64748b", textAlign: "center", lineHeight: 24, marginRight: 10, fontSize: 12 },
  stepTextActive: { fontSize: 13, fontWeight: "bold", color: "#1e293b" },
  stepText: { fontSize: 13, color: "#94a3b8" },
  tabBar: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", backgroundColor: "#ffffff", borderTopWidth: 1, borderTopColor: "#e2e8f0", paddingVertical: 12 },
  tabBtn: { flex: 1, alignItems: "center" },
  tabText: { fontSize: 12, fontWeight: "600", color: "#64748b" },
  tabActive: { color: "#f43f5e", fontWeight: "900" },
});
