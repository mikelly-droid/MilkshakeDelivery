import{
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";


/////teste que n ta dando erro bisha///
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
    },
});
/////////fim do teste//////
export default function HomeScreen() {
    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.greeting}>Olá👋</Text>
                <Text style={styles.title}>O que deseja tomar hoje?🥤</Text>
            
            </View>

            <view style={styles.banner}>
                <text style={style={styles.offer}}>Oferta do dia: Milkshake de morango com 20% de desconto!🍓</text>
                
                <text style={style.bannerTitle}>Milkshake de morango</text>
                <text style={style.bannerSubtitle}>Delicioso milkshake de morango com chantilly e calda de chocolate.</text>

                <text style={styles.bannerText}>Aproveite essa oferta por tempo limitado!⏰</text>
                
                <TouchableOpacity style={styles.Button}>
                    <text style={styles.ButtonText}>Peça agora</text>
                </TouchableOpacity> 
            </view>
        </ScrollView>
    );
}  


header: {
    marginBottom: 50,
    marginTop: 25,
},