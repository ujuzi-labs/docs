**

# DOCUMENTATION OFFICIELLE – PROJET WENZE

PARTIE NON TECHNIQUE EXPLIQUÉE

## I. Introduction et origine du projet – Pourquoi Wenze

Wenze est un nom issu de la langue Lingala, l’une des quatre langues nationales de la République Démocratique du Congo. Il signifie marché, un concept universel au cœur de toutes les sociétés humaines. Ce mot trouve son équivalent dans soko en swahili, marché en français et market en anglais. Le choix de ce nom reflète la vision du projet : créer un espace d’échange économique accessible, inclusif et profondément ancré dans la réalité locale.

L’idée de Wenze est née d’une expérience vécue par l’un des membres de l’équipe sous le scénario ci-dessous: 

En parcourant les statuts WhatsApp, il découvre une vendeuse proposant des vêtements et, séduit par une chemise, il prend contact avec elle ; après négociation, un accord est trouvé sur le prix et, pour instaurer la confiance, il envoie une partie du montant à l’avance. 

Au moment prévu pour la livraison, la vendeuse annonce que l’article a déjà été vendu à une autre personne et tente de proposer un produit différent, ce qui déçoit l’acheteur qui, sans mécanisme de recours, met fin à la transaction. 

Pris isolément, cet événement pourrait paraître banal, mais lorsqu’il est partagé avec les autres membres de l’équipe dans le cadre du hackathon, il déclenche une réflexion plus large, et des discussions approfondies, des entretiens informels et des enquêtes menées auprès de commerçants et d’acheteurs à Goma révèlent que ce type de situation est fréquent.

L’équipe a alors compris que le problème n’était pas individuel mais structurel, et que la blockchain Cardano pouvait offrir une réponse crédible à ces défaillances de confiance.

## II. Contexte local – Le commerce à Goma

La ville de Goma, capitale du Nord-Kivu, est aujourd’hui une cité dynamique, connectée et en pleine mutation numérique. Une grande partie de la population vit principalement du commerce. Les échanges s’effectuent dans des marchés publics, des marchés informels, des boutiques, des galeries commerciales ou encore dans des espaces improvisés.

Avec l’essor des smartphones et de l’Internet mobile, de nombreux commerçants ont progressivement migré vers les réseaux sociaux tels que WhatsApp, Facebook, TikTok ou Snapchat pour vendre leurs produits. Cette transition s’est faite de manière spontanée, sans cadre structuré ni règles claires. Si elle a permis d’élargir la portée des vendeurs, elle a également amplifié des dysfonctionnements déjà présents dans le commerce local.

## III. Population cible

Wenze s’adresse prioritairement aux acteurs suivants de l’écosystème économique local :

- Vendeurs informels et semi-formels utilisant WhatsApp, Facebook, TikTok ou Snapchat comme principal canal de vente.
    
- Commerçants disposant ou ayant disposé d’espaces physiques, confrontés aux loyers élevés, à la fiscalité et à l’insécurité.
    
- Acheteurs en ligne locaux, souhaitant acheter des produits en toute sécurité et éviter les arnaques.
    
- Intermédiaires et promoteurs de produits, souvent invisibles et non reconnus dans les circuits informels.
    
- Jeunes et utilisateurs curieux de la blockchain Cardano, recherchant des cas d’usage concrets et utiles au quotidien.
    

L’objectif de Wenze est de créer un cadre de confiance partagé entre ces acteurs, en tenant compte des réalités économiques, sociales et sécuritaires de la ville de Goma.

## III. Problèmes identifiés

### Synthèse des problèmes clés (lecture rapide pour les réviseurs)

- Absence de mécanismes de confiance et de protection des paiements entre acheteurs et vendeurs.
    
- Manque de visibilité durable et structurée des produits vendus localement.
    
- Pratiques commerciales opportunistes ou trompeuses favorisées par l’informalité.
    
- Pertes économiques liées aux déplacements inutiles, rendez-vous non honorés et ventes annulées.
    
- Vulnérabilité accrue du commerce physique face à l’instabilité sécuritaire à Goma.
    
- Absence de système de réputation fiable permettant d’identifier les vendeurs sérieux.
    

### 1. Difficultés liées au commerce physique

Les commerçants disposant d’espaces physiques font face à de lourdes contraintes. Les loyers élevés, les taxes multiples et les charges récurrentes réduisent considérablement leurs marges. Leur visibilité reste limitée à leur emplacement géographique, ce qui freine l’acquisition de nouveaux clients.

Dans le contexte spécifique de Goma, ces difficultés sont accentuées par l’instabilité sécuritaire liée aux conflits armés. De nombreux commerçants sont contraints d’abandonner leurs espaces par manque de moyens ou par crainte pour leur sécurité, fragilisant davantage l’économie locale.

Du côté des clients, fréquenter les marchés physiques implique souvent une perte de temps et d’argent. Les acheteurs se déplacent sans garantie de trouver les produits recherchés, faute de visibilité sur la disponibilité réelle des articles, ce qui entraîne des déplacements inutiles et une frustration croissante.

### 2. Limites du commerce via les réseaux sociaux

Pour contourner les contraintes du commerce physique, beaucoup de vendeurs utilisent les réseaux sociaux. Cependant, ce mode de vente comporte de nombreuses limites. Les statuts WhatsApp ou Facebook expirent après vingt-quatre heures, réduisant fortement la durée de visibilité des produits. Les publications ne touchent généralement que les contacts directs du vendeur, limitant ainsi leur portée.

Il est également fréquent que certains vendeurs publient des produits qu’ils ne possèdent pas réellement, ou affichent des prix attractifs qui changent au moment de la transaction. Des rendez-vous sont souvent fixés sans être honorés, entraînant une perte de temps pour les deux parties.

Pour les clients, un problème récurrent réside dans la différence entre les images publiées et la réalité du produit. Une fois sur place, ils découvrent parfois des écarts de qualité, de couleur ou d’état, sans aucun mécanisme de recours ou de preuve.

### 3. Problème fondamental

L’analyse de ces situations met en évidence un problème central : l’absence de confiance structurée dans les échanges commerciaux numériques et informels. Les transactions reposent uniquement sur la bonne foi des individus, sans mécanisme garantissant le respect des engagements, la sécurisation des paiements ou la gestion des litiges.

## IV. Vision et solution proposée par Wenze

Wenze est une application de marketplace mobile-first, conçue pour connecter acheteurs et vendeurs locaux dans un environnement sécurisé, transparent et équitable. Elle ne se limite pas à la digitalisation du commerce existant, mais introduit un cadre de confiance basé sur la blockchain Cardano.

La plateforme intègre un smart contract escrow, véritable pilier de la solution. Le principe est simple : aucun paiement n’est définitivement transféré tant que les conditions de la transaction ne sont pas remplies. Ce mécanisme protège à la fois l’acheteur et le vendeur et réduit considérablement les risques de fraude.

## V. Fonctionnement du smart contract escrow

Lorsqu’un acheteur souhaite acquérir un produit ou un service, le paiement est envoyé dans un contrat intelligent escrow déployé sur Cardano. Les fonds sont temporairement bloqués et ne peuvent être libérés qu’après confirmation de la réception conforme du produit ou du service.

En cas de litige ou d’annulation, des règles prédéfinies permettent soit le remboursement de l’acheteur, soit le transfert au vendeur. Ce mécanisme élimine les pratiques abusives telles que les faux produits, les changements de prix non justifiés ou la vente multiple d’un même article.

## VI. Réputation, gamification et confiance (WZP)

Chaque interaction sur Wenze contribue à la construction d’une réputation numérique. La plateforme introduit un système de points de contribution appelés WZP (Wenze Points), associés aux portefeuilles Cardano des utilisateurs.

Les comportements honnêtes et fiables sont récompensés :

- ventes réussies,
    
- achats validés,
    
- utilisation de l’escrow,
    
- évaluations honnêtes.
    

Les vendeurs ayant une bonne réputation bénéficient d’une meilleure visibilité, tandis que les comportements abusifs sont progressivement pénalisés. La confiance devient ainsi un actif numérique mesurable et vérifiable.

## VII. Impact sur la communauté locale

Pour la communauté de Goma, Wenze offre un espace structuré permettant aux commerçants, y compris les jeunes et les vendeurs informels, de présenter leurs produits et services sans dépendre d’un espace physique coûteux. Les clients gagnent en sécurité, en transparence et en gain de temps.

En période d’instabilité, la plateforme contribue à la résilience économique locale en offrant une alternative numérique fiable aux marchés traditionnels fragilisés.

## VIII. Impact sur l’écosystème Cardano

Wenze constitue un cas d’usage concret et contextualisé de la blockchain Cardano en Afrique. En intégrant des smart contracts escrow, un système de réputation et des mécanismes de gamification, le projet démontre comment Cardano peut répondre à des problématiques réelles, au-delà de la spéculation.

La plateforme favorise une adoption progressive de Cardano par des utilisateurs non techniques, notamment via des paiements hybrides combinant mobile money et blockchain.

## IX. Vision à long terme

À long terme, Wenze ambitionne de devenir une infrastructure de confiance pour le commerce local et régional. L’intégration de NFT pour la certification des produits, la distinction entre produits neufs et d’occasion, ainsi que l’extension aux services professionnels permettront de bâtir un écosystème économique durable, transparent et inclusif.

## Conclusion

Wenze n’est pas seulement une application de marketplace. C’est une réponse technologique à un problème social réel, née de la communauté et conçue pour la communauté. En combinant les réalités locales de Goma avec la puissance de la blockchain Cardano, le projet propose une nouvelle manière de commercer, fondée sur la confiance, la transparence et la responsabilité partagée.

  
**