﻿# Snake o Jogo da Cobrinha com Ranking

<h2 align="center">Capturas de Tela PC</h2>

<p align="center">
  <img src="https://blogger.googleusercontent.com/img/a/AVvXsEht-2i4gNYVNyPmqsW1_FaGBqqpUltHE0kH2VZ8b35kbNjjkcL9uq2B0tzsSMvQDAPrghsOX1t9ooZ4SJtieNNosk0nFyvo0K7Hpu3lZ_rQPTcZyVmsY44JXFb91CHqpFZB_7r-oCTTcPubA3RHuT0PATTCZ8jF0_C8J0opAayum0PxOTXxUPoRfY5wb5_i" width="800">
</p>

<p align="center">
  <img src="https://blogger.googleusercontent.com/img/a/AVvXsEiJAxJ1Ps_U9XbwRus6TZjlK1pyND6JTE_v-4oWo3x5i_GfCWwkNepx_JLt-ZACVYkp7Fw_cLKu_cH0Z3gqU09fehkRfnKbkHXdgOQyvZDfD0afmLqshyme1zkimD-JzHx8GnZzOsfkObr-XfcUMEOAf8VCvsLdExdmLF0poZCk_OlqzMbb4QIsISI66mal" width="800">
</p>

<p align="center">
  <img src="https://blogger.googleusercontent.com/img/a/AVvXsEjEspvt-HLSC00pKOh-APGYWbFiZX8aOsdBID1nT0d0WsPSID5cKOONeJshiUh8l8oTPuY87tCFdRfs3O_cZVUKdnDM85zu4EQ_idFNkH4RLUULXHndSfw1ZtuUxB48-0DNAibIdfztbFapJArj3LlP6bZFXa_pwsrdriRJV8bFWLylOpCRRFJKpZ7RycIw" width="800">
</p>


<h2 align="center">Capturas de Tela Celular</h2>

<p align="center">
  <img src="https://blogger.googleusercontent.com/img/a/AVvXsEi2xGL9iaWrcCbxXXuaDinv5rcdyyPLloFGiUpFBU-abI1Mb1mJcmir6C0-fcqzhhLIaJyl8w0fLQu4_MCN6mawKammQkLyE_rI5Z6mIpMnlsUDmDn_wmVHVVLBpEo25JziaLRDoFajuxatycaAdK4aEZaJXG6FSL-NLGQ68Izw905PLfFeOWULcDMT36io">
</p>

<p align="center">
  <img src="https://blogger.googleusercontent.com/img/a/AVvXsEgUWcE5frwZr76i1u1lJIf1JwIQTmBuvEa0ITTCb-xkotuVPltJGMAMupvthVM7xlDUHGyTbaZLp1qCa-gzCVlEHamV38H__4DOaQD9d66sTjpEldfBWX6eXiaJas-B3zf_JodJseMPwTtCeEiP2K1cHWEaNbLMnaGRZMEByIDJV6GqRv2QM5qRYHV7qTU2">
</p>

<p align="center">
  <img src="https://blogger.googleusercontent.com/img/a/AVvXsEiBNZBu0QKFXaHU-dLsy9MFwqfL52YcumMMjX-3S5Fq_CPFjpyWInoAtRe4QllP45oOXouiYsARrFY9KBeuW6BUTJk8vMZWkDwdIU1SMLBF6SX14Hfwaiuf1W8lqazd1Nao0LYh_vZl5T60Z5XhIhw12qgMcnlOCAb2PXBWbAVukUpURTPIFgWYinHR5N8w">
</p>

## Configuração

1. **Clonando o repositório:**
- Coloque a pasta em um servidor PHP local como o XAMPP ou WAMP

2. **Importando o banco de dados:**
- Execute o script SQL fornecido (`script.sql`) para criar o banco de dados e a tabela necessária no MySQL.

```
  -- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS snake_ranking;

-- Selecionar o banco de dados
USE snake_ranking;

-- Criação da tabela de jogadores
CREATE TABLE IF NOT EXISTS jogadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    pontos INT NOT NULL
);

-- Criação de usuários 
CREATE USER 'nome_do_usuario'@'localhost' IDENTIFIED VIA mysql_native_password USING 'sua_senha';
GRANT SELECT, INSERT, UPDATE, DELETE ON snake_ranking * TO 'nome_do_usuario'@'localhost';
```

3. **Configurando a conexão com o banco de dados:**
- Edite o arquivo `conexao.php` e atualize as informações de conexão com o seu banco de dados MySQL.

```
<?php

// Configurações do banco de dados
$host = 'localhost';
$dbname = 'snake_ranking';
$username = 'seu usuario';
$password = 'sua senha';

// Tentar estabelecer a conexão com o banco de dados
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar: " . $e->getMessage());
}
```

# Tecnologias Utilizadas
- HTML
- Java Script
- CSS
- Bootsrap
- PHP
- SQL

# Como Jogar
- No navegar vai em localhost/o nome da pasta
- Insira seu nome no campo indicado e clique no botão "Iniciar Jogo" ou Enter.
- Para jogar basta usar as setas do teclado ⬅️ ⬆️ ➡️ ⬇️ ou Clicar com o 🖱 e controlar a 🐍

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver alguma sugestão de melhoria, por favor, abra uma issue ou envie um pull request.

## Créditos

- Desenvolvido por [João Marcos](https://links.jm7087.com)
