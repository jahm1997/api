const axios = require("axios");
const { Dog } = require("../db");

const preloadDogs = async () => {
  try {
    const count = await Dog.count();
    if (count > 0) return;

    console.log("Cargando perros desde la API externa a la base de datos...");
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    
    // Limitamos a 100 perros como solicitado
    const dogsData = response.data.slice(0, 100);
    
    // Mapeamos los perros, pero necesitamos resolver las promesas de las imágenes
    const dogsApiPromises = dogsData.map(async (dog) => {
        let imageUrl = ""; // Imagen por defecto

        if (dog.image?.url) {
            imageUrl = dog.image.url;
        } else if (dog.reference_image_id) {
            try {
                // Si no viene la URL directa, consultamos el endpoint de la imagen
                const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}`);
                if (imageResponse.data?.url) {
                    imageUrl = imageResponse.data.url;
                }
            } catch (imgError) {
                console.log(`No se pudo obtener imagen para ${dog.name}: ${imgError.message}`);
            }
        }

        return {
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
            image: imageUrl,
            temperament: dog.temperament,
        };
    });

    const dogsApi = await Promise.all(dogsApiPromises);

    await Dog.bulkCreate(dogsApi);
    console.log("Base de datos poblada con éxito!");
  } catch (error) {
    console.log("Error al poblar la base de datos:", error.message);
  }
};

module.exports = preloadDogs;
