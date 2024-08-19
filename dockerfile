# Usa una imagen oficial de Node.js como imagen base
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install --legacy-peer-deps

# Copia el resto de la aplicación al contenedor
COPY . .

# Asegúrate de que el archivo JSON se copia correctamente
COPY /data/dataPerson.json /data/dataPerson.json
COPY /data/dataTc.json /data/dataTc.json


# Compila la aplicación
RUN npm run build

# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
