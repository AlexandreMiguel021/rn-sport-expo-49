import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { toast } from '@/components/Toast'
import { useFetch } from '@/hooks/useFirestoreFetch'
import { Product } from '@/models/product'
import { AuthError } from '@/utils/auth-error-handler'

const productsRef = firestore().collection("produtos")

const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function Home() {
  const products = useFetch<Product[]>(productsRef)

  const handleSignOutPress = useCallback(() => {
    try {
      auth().signOut()
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error({ title: 'Ocorreu um erro', text: error.message })
      }
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, margin: 16 }} weigth='bold'>Produtos</Text>
      <FlatList
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => {
          return <View style={styles.productItem}>
            <Text style={{ fontSize: 16 }} weigth='semiBold'>{item.name}</Text>
            <Text>{BRL.format(item.price)}</Text>
          </View>
        }} data={products} />
      <View style={{ marginHorizontal: 16 }}><Button title="Sair" onPress={handleSignOutPress} /></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productItem: {
    padding: 12,
    shadowColor: "black",
    borderRadius: 8,
    marginHorizontal: 12,
    shadowOpacity: 0.07,
    shadowOffset: { height: 2, width: 2 },
    gap: 4,
    backgroundColor: "#fff"
  }
})
