import { useEffect, useState } from "react"
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

import { useLoadingStore } from "@/components/Loading/Loading.component"
import { toast } from "@/components/Toast"

export function useFetch<T>(ref: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>) {
    const setIsLoading = useLoadingStore((action) => action.setLoading)
    const [data, setData] = useState([] as T)

    useEffect(() => {
        async function getProducts() {
            setIsLoading(true)

            ref.get().then(result => {
                const producsResult = result.docs.map(item => item.data())
                setData(producsResult as T)
            }).catch((error) => {
                toast.error(error)
            }).finally(() => {
                setIsLoading(false)
            })
        }

        getProducts()
    }, [])

    return data
}