import ActionButtons from "@/components/ui/InstructorActionButtons"
import DashboardInfo from "@/components/ui/InstructorDashboard"
import Header from "@/components/ui/InstructorHeader"
import PerformanceChart from "@/components/ui/InstructorPerformanceChart"
import RecentTransactions from "@/components/ui/InstructorRecentTransaction"
import Wallet from "@/components/ui/InstructorWallet"
import { Text, TouchableOpacity, View } from "react-native"
import { StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAlert } from "@/hooks/useAlert";
import Loader from "@/components/ui/Loader";
import { api } from '@/lib/actions/api';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useFocusEffect } from '@react-navigation/native';
import {useState, useEffect} from "react"



const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const userData = useAppSelector(state => state.user.user)
  const userToken = useAppSelector(state => state.user.userLoginToken)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const res = api.getInstructorTransactions(userData?.id, userToken);
    console.debug({res})

  }, [])
  
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={styles.container}>
      <Header/>
      <Wallet />
      <ActionButtons />
      {/* <PerformanceChart/> */}
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.title}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.title}>View All</Text>
            </TouchableOpacity>
            </View>
      <RecentTransactions/>
      
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding:10
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
  },
})

export default HomeScreen

