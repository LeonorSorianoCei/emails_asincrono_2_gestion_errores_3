// easyFetch({
//     url: "https://mutl",
//     method: "PUT",
//     body: formData,
//     timeout: 3000,
//     callback: (data) => {
//         console.log("TENGO MIS DATOS", data)
//     }
// })

export const easyFetch = async ({
    url, method="GET", body = null, timeout=5000, callback=null
}) => {

    const controller = new AbortController()
    const abortTimeout = setTimeout( () => controller.abort(), timeout)

    const fetchOptions= {
        method,
        headers: {
            "Content-type" : "application/json"
        },
        signal: controller.signal
    }
    if(body) {
        fetchOptions.body = JSON.stringify(body)
    }

    try {
        const response = await fetch(url, fetchOptions)

        if(!response.ok) {
            throw new Error(response.statusText)
        }
        const data = await response.json()

        if (callback) {
            callback(data)

        } else {
            return data
        }
    }
    catch (error) {
        console.error("Error al realizar el request", error.message)
    }
}