# Seccion 24 del curso, Auth - MEAN, Backend

En esta seccion no se toca nada de angular, simplemente se crea un servidor en node usando express y usando la base de datos en moongo, con mongoose

## Creando JWT y Hash para la contraseña

Creamos Json web Tokens para mantener la sesion de usuario, y hasehamos las contraseñas para que siempre se guarden encriptadas

<https://jwt.io/> Enlace a JWT

### Aunque en la seccion del curso se hace todo con javascript, en mi caso lo he desarrollado con Typescript

Tambien hemos tenido que inferir y cambiar una interfaz personalizada para que la request aceptara el tipado de usuario

## Codigo de la seccion en Javascript / en el repositorio se puede encontrar el mio en TypeScript

<https://github.com/Klerith/angular-auth-mean/releases/tag/v0.24.0>

## Para generar la variable de entorno de Heroku

Ya que no funcionaba al instalar el Cli de Heroku para desplegar el server de node

```text
set PATH=%PATH%;C:\Program Files\Heroku\bin
```

poniendo esto con la ruta en la terminal, obliga a Windows a aceptar la ruta donde se haya instalado Heroku

### Para actualizarlo

simplemente escribimo "heroku update"

y para comprobar la version simplemente "heroku --version"
