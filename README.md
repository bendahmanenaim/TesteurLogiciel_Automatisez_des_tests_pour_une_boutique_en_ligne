
# EcoBlissBath

Bienvenue sur **EcoBlissBath**, une application web conçue pour fournir une expérience de shopping en ligne simple et agréable pour les produits de bain écologiques. Avec une interface conviviale et une variété de produits, EcoBlissBath vise à offrir une plateforme où les utilisateurs peuvent trouver des produits de bain respectueux de l'environnement et partager leurs avis sur ces produits.

## Introduction

EcoBlissBath est une application de commerce électronique spécialisée dans les produits de bain écologiques. Cette application permet aux utilisateurs de parcourir une large gamme de produits, de lire et de laisser des avis, et de gérer leurs achats en ligne de manière efficace. L'application est construite avec une architecture moderne, utilisant un frontend basé sur Angular et un backend basé sur Node.js, le tout déployé et géré via Docker pour une intégration continue et une maintenance simplifiée.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 12 ou supérieure)
- [npm](https://www.npmjs.com/) (version 6 ou supérieure)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Ce que j'ai appris de ce projet

Ce projet m'a permis d'approfondir mes connaissances dans les domaines suivants :

- **Docker** : Conteneurisation des applications pour un déploiement et une gestion simplifiés.
- **Tests Automatisés** : Utilisation de Cypress pour écrire et exécuter des tests automatisés afin d'assurer la qualité et la fiabilité de l'application.
- **Sécurité Web** : Implémentation de mesures pour protéger l'application contre les vulnérabilités courantes comme les attaques XSS.

## Installation et Exécution du Projet

Suivez ces étapes pour cloner, installer et exécuter le projet EcoBlissBath.

### Cloner le Projet

```bash
git clone https://github.com/votre-utilisateur/EcoBlissBath.git
cd EcoBlissBath

### Installer les Dependances


`Backend`
cd backend
npm install

`Frontend`

cd frontend
npm install

### Lancer_l_Application avec Docker Compose

Assurez-vous d'être dans le répertoire racine du projet (EcoBlissBath) puis exécutez :

**_docker-compose up --build_**

### Execution_des Tests Cypress

Pour ouvrir l'interface graphique de Cypress et exécuter les tests :

cd frontend
npm install cypress --save-dev

**_Exécution des Tests Cypress_**

npx cypress open
Cela ouvrira l'interface graphique de Cypress où vous pourrez exécuter les tests. Alternativement, vous pouvez exécuter les tests en mode headless :

npx cypress run

#### Informations de Connexion pour les Tests

- Email : test2@test.fr
- Mot de Passe : testtest

 # Historique des Versions

- 1.0.0 : Version initiale de l'application.
- 2.0.0 : Ajout de nouvelles fonctionnalités, optimisation des performances et correction de bugs.

## Auteur

- Nom : Bendahmane Naim

## Avantages de Cypress

- Facilité d'Utilisation : Cypress est conçu pour être facile à installer et à utiliser, même pour les débutants.
- Test en Temps Réel : Permet de voir les tests s'exécuter en temps réel dans un navigateur.
- Débogage Facile : Cypress offre des outils de débogage puissants, ce qui facilite l'identification et la correction des problèmes.
- Exécution Rapide : Les tests Cypress sont rapides à exécuter, ce qui permet un cycle de développement plus rapide.