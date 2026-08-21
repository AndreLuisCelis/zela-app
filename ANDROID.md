# Como Rodar o Zela App no Android (Capacitor)

Este guia explica como compilar, rodar e atualizar o aplicativo **Zela App** em um dispositivo ou emulador Android utilizando o **Capacitor**.

---

## 🛠️ Requisitos Prévios

1. **Android Studio** instalado em sua máquina.
2. Um emulador configurado no Android Studio OU um celular Android físico com a **Depuração USB** ativada nas Opções do Desenvolvedor.

---

## 🚀 Como abrir o projeto no Android Studio

Como o Capacitor já está instalado e configurado, para abrir o projeto nativo do Android basta seguir os passos abaixo:

1. Abra o terminal na pasta raiz do client:
   ```bash
   cd client
   ```

2. Execute o comando para abrir o Android Studio automaticamente importando o projeto:
   ```bash
   npx cap open android
   ```

3. No **Android Studio**, aguarde a sincronização do Gradle terminar.

4. Selecione o seu dispositivo físico ou emulador no topo e clique no botão **Run** (ícone de Play verde `▶`) para instalar e iniciar o app.

---

## 🔄 Como atualizar o App com novas alterações web

Sempre que você alterar o código da aplicação Angular (HTML, CSS, TypeScript) no VS Code e quiser testar a nova versão no celular, você precisa sincronizar os arquivos.

1. Na pasta `client`, gere a build de produção do Angular:
   ```bash
   npm run build
   ```

2. Copie os novos arquivos estáticos para o projeto nativo do Android:
   ```bash
   npx cap copy
   ```

3. No **Android Studio**, clique novamente no botão **Run** (`▶`) ou clique no botão de **Apply Changes** para atualizar o app no celular sem precisar reinstalar tudo.

---

## 📂 Estrutura do App Nativo

O projeto nativo do Android está localizado em:
`client/android/`

* Se você precisar alterar ícones de carregamento (Splash Screen), ícones de aplicativo (Launcher Icons) ou configurações específicas de permissões nativas do Android, tudo isso será feito abrindo a pasta acima no **Android Studio**.
