---
title: "Securizar Nginx con Let's Encrypt en Ubuntu"
description: "Securizar Nginx con Let's Encrypt en Ubuntu: Certbot, certificados SSL, renovación automática y configuración HTTPS"
date: 2024-05-25
mod: 2025-10-25
published: true
tags: [lets-encrypt, linux, nginx, platform, ubuntu]
---

# Securizar Nginx con Let's Encrypt en Ubuntu

Let's Encrypt es una autoridad certificadora (CA) que proporciona una forma accesible de obtener e instalar certificados TLS/SSL gratuitos , habilitando así HTTPS cifrado en servidores web.

## Instalar Certbot

Certbot recomienda utilizar su paquete de *snap* para la instalación.

```shell
sudo snap install core 
sudo snap refresh core
```

Si has trabajado con otra versión tienes que eliminarla antes

```shell
sudo apt remove certbot
```

Instala el paquete:

```shell
sudo snap install --classic certbot
```

puedes vincular el `certbot`comando desde el directorio de instalación instantánea a su ruta, de modo que podrá ejecutarlo simplemente escribiendo `certbot`:

```shell
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

## Confirmar la configuración de Nginx

Certbot necesita el block server en su configuración de Nginx para poder configurar SSL automáticamente.

Verifica que tengas el block server de Nginx configurado mediante nano:

```shell
sudo nano /etc/nginx/sites-available/example.com
```

Encuentra la `server_name`línea existente. Debe tener un aspecto como este:

```shell
server_name example.com www.example.com;
```

Si es así, sal de su editor y continúa.

Si no es así, actualízalo para que coincida. Luego guarde el archivo, salga de su editor y verifique la sintaxis de sus ediciones de configuración:

```shell
sudo nginx -t
```

Si recibes un error, vuelve a abrir el archivo del block server. Vuelve a cargar Nginx para cargar la nueva configuración:

```shell
sudo systemctl reload nginx
```

Certbot ahora puede encontrar el block server correcto y actualizarlo automáticamente.

A continuación, actualicemos el firewall para permitir el tráfico HTTPS.

## Permitir HTTPS a través del firewall

Si tiene el `ufw`firewall habilitado, deberás ajustar la configuración para permitir el tráfico HTTPS. Afortunadamente, Nginx registra algunos perfiles durante la instalación.

Puede ver la configuración actual escribiendo:

```shell
sudo ufw status
```

Probablemente se verá así, lo que significa que sólo se permite tráfico HTTP al servidor web:

```shell
OutputStatus: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Nginx HTTP                 ALLOW       Anywhere                  
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
```

Para permitir adicionalmente el tráfico HTTPS, permite el perfil completo de Nginx y elimina la asignación redundante del perfil HTTP de Nginx:

```shell
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```

Su estado ahora debería verse así:

```
OutputStatus: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
Nginx Full                 ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
Nginx Full (v6)            ALLOW       Anywhere (v6)
```

A continuación, ejecutemos Certbot y obtengamos nuestros certificados.

## Obtener un certificado SSL

```shell
sudo certbot --nginx -d example.com -d www.example.com
```

Esto ejecuta `certbot`con el complemento`--nginx`, utilizándo `-d`para especificar los nombres de dominio para los que nos gustaría que el certificado sea válido.

Al ejecutar el comando, te pedirá un mail y aceptar los términos del servicio. Después deberías ver algo así:

```shell
OutputIMPORTANT NOTES:
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/your_domain/fullchain.pem
Key is saved at: /etc/letsencrypt/live/your_domain/privkey.pem
This certificate expires on 2022-06-01.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
* Donating to ISRG / Let's Encrypt: https://letsencrypt.org/donate
* Donating to EFF: https://eff.org/donate-le
```

## Verificar la renovación automática de Certbot

Los certificados de Let's Encrypt solo son válidos por noventa días. `certbot` se encarga de esto agregando un temporizador systemd que se ejecutará dos veces al día y renovará automáticamente cualquier certificado que esté dentro de los treinta días posteriores a su vencimiento.

Puede consultar el estado del temporizador con `systemctl`:

```
Output○ snap.certbot.renew.service - Service for snap application certbot.renew
     Loaded: loaded (/etc/systemd/system/snap.certbot.renew.service; static)
     Active: inactive (dead)
TriggeredBy: ● snap.certbot.renew.timer
```

Para probar el proceso de renovación, puede realizar un ensayo con `certbot`:

Si no ve ningún error, ya está todo listo. Cuando sea necesario, Certbot renovará sus certificados y recargará Nginx para recoger los cambios. 

Si el proceso de renovación automatizado alguna vez falla, Let's Encrypt enviará un mensaje al correo electrónico que especificó, advirtiéndole cuando su certificado esté a punto de caducar.
