import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { TextInput } from "react-native-paper"
import { Mail, ArrowLeft } from "lucide-react-native"
import { router } from "expo-router"
import { useAlert } from "@/hooks/useAlert"
import { useState } from "react"
import Loader from "@/components/ui/Loader"
import { api } from "@/lib/actions/api"
import {useAppDispatch} from "@/hooks/useAppDispatch"
import {getUserInfo, getUserLoginToken} from "@/lib/reducers/storeUserInfo"
import { LinearGradient } from "expo-linear-gradient"
const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm<{ email: string }>()

  const {showAlert} = useAlert()
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  
  
  const onSubmit = async (data: FormData) => {
    try{
      setLoading(true)
      const {email} = data

      const body = {
        email,
      }

      const res = await api.sendForgotPwdVerificationEmail(body)
      
      dispatch(getUserInfo(null))
      console.log(res, "data")

      showAlert('success', "Otp have been sent to your email for verification")

      setTimeout(() => {
      router.push({
        pathname:"/instructor/(auth)/verify-email",
        params:{
          email,
          type:"reset-password"
        }
      })
      }, 500);
    }
    catch(err){
      console.log(err.response.data)
      if(err.response.data.detail){
        showAlert('error', err.response.data.detail)
      }
      else if(err.message){
        showAlert('error', err.message)
      }
      else {
        showAlert('error', 'Error sending email otp. Try again')
      }

    }
    finally{
      setLoading(false)
    }
  }

  return (
    <>
    {loading && <Loader/>}
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <LinearGradient colors={["#4169E1", "#6495ED"]} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Forgot Password</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>Enter your email address and we'll send you a verification code</Text>

        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required", pattern: /^\S+@\S+$/i }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              label="Email"
              value={value}
              onChangeText={onChange}
              error={!!error}
              left={<TextInput.Icon icon={() => <Mail size={20} color="#4169E1" />} />}
              style={styles.input}
              mode="outlined"
              outlineColor="#E0E0E0"
              activeOutlineColor="#4169E1"
            />
          )}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Send Code</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: "30%",
    justifyContent: "flex-end",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  formContainer: {
    padding: 20,
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#4169E1",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default ForgotPasswordScreen

