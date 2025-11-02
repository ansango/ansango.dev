---
title: Certificados
description: "Instalar certificados PEM: Windows con MMC, macOS con Acceso a Llaveros, Linux con update-ca-certificates y configuración Nginx/Apache"
date: 2025-08-06
mod: 2025-10-25
published: true
tags: [certificates, linux, mac, network, windows]
---

# Certificados

Instalar un certificado **.pem** puede variar un poco dependiendo del sistema operativo y la aplicación que lo necesite, pero el proceso general es bastante similar. En la mayoría de los casos, simplemente se importa el archivo a un almacén de certificados o se especifica su ubicación en la configuración de un servicio o aplicación.

## **En Windows** 💻

Para instalar un certificado .pem en Windows, usás la **Consola de administración de Microsoft (MMC)**.

1. **Win + R**, escribe `mmc` y **Enter**.
2. En el menú, haz clic en **Archivo** y luego en **Agregar o quitar complemento**.
3. Selecciona **Certificados** y haz clic en **Agregar**.
4. Elige **Cuenta de equipo** y luego **Siguiente**.
5. Selecciona **Equipo local** y haz clic en **Finalizar**. Luego, **Aceptar**.
6. Ahora, en el panel izquierdo, expande **Certificados (Equipo local)**.
7. Haz clic derecho en la carpeta donde quieres importar el certificado (por ejemplo, **Personal** o **Entidades de certificación raíz de confianza**), elige **Todas las tareas** y luego **Importar**.
8. Seguí el asistente de importación y selecciona el archivo **.pem** que quieres instalar.

---

## **En macOS** 🍏

En macOS, usás el **Acceso a Llaveros**.

1. Hazs doble clic en el archivo **.pem**. Esto debería abrir automáticamente la aplicación **Acceso a Llaveros**.
2. Cuando se te pregunte, elige el llavero en el que quieres guardar el certificado (por lo general, **login** o **Sistema**).
3. Ingresa tu contraseña de administrador para confirmar la instalación.
4. Si el certificado no es de confianza, puedes hacer clic derecho sobre él en el **Acceso a Llaveros**, seleccionar **Obtener información** y luego cambiar la configuración de **Confiar** a **Siempre confiar**.

---

## **En Linux** 🐧

En la mayoría de las distribuciones de Linux, puedes instalar certificados **.pem** copiándolos al directorio de certificados del sistema y luego actualizando la configuración.

1. Copia el archivo **.pem** al directorio de certificados. La ubicación puede variar, pero a menudo es `/etc/ssl/certs/` o `/usr/local/share/ca-certificates/`.

2. Usa el siguiente comando para copiar el archivo (cambia tu-certificado.pem por el nombre de tu archivo): 

```bash
sudo cp tu-certificado.pem /usr/local/share/ca-certificates/
```

1. Luego, ejecutá el comando para actualizar los certificados del sistema:

```bash
sudo update-ca-certificates
```

---

## **En Nginx o Apache** ⚙️

Si vas a usar el certificado para un servidor web, como Nginx o Apache, lo configurarás directamente en el archivo de configuración del servidor.

**Para Nginx:**

En el archivo de configuración del sitio (normalmente en `/etc/nginx/sites-available/` o `/etc/nginx/conf.d/`), agrega las siguientes líneas dentro del bloque `server`:

Nginx

```bash
listen 443 ssl;
ssl_certificate /ruta/a/tu/certificado.pem;
ssl_certificate_key /ruta/a/tu/clave-privada.key;
```

**Para Apache:**

En el archivo de configuración del sitio (normalmente en `/etc/apache2/sites-available/` o `/etc/httpd/conf.d/`), agrega estas líneas dentro del bloque `<VirtualHost>`:

Apache

```bash
SSLEngine on
SSLCertificateFile /ruta/a/tu/certificado.pem
SSLCertificateKeyFile /ruta/a/tu/clave-privada.key
```

Recuerda **reiniciar el servicio** después de hacer los cambios: 

```bash 
sudo systemctl restart nginx 
```

o 

```bash 
sudo systemctl restart apache2
```
