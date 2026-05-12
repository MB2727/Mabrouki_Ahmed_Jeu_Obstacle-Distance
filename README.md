# Description :
    
   Death Age est un jeu vidéo de type endless runner développé dans le cadre d’un projet de développement web.Le joueur 
   incarne un leader mondial (Iran, Tunisie, Russie, Chine, États-Unis) et doit survivre le plus longtemps possible 
   sur un champ de bataille ravagé par la guerre. 

   Des véhicules terrestres roulent vers lui, des bombes tombent du ciel (larguées par des jets ennemis) et des bidons
   de pétrole apparaissent comme bonus pour augmenter son score.

   Le joueur peut se déplacer latéralement, sauter, s’accroupir pour éviter les obstacles et collecter les bonus.

   L’univers du jeu est inspiré de l’actualité géopolitique, avec un ton décalé et purement ludique. 



# Technologies Utilisées :
 
   _HTML5 : structure des écrans (accueil, sélection du personnage, zone de jeu)_

   _ CSS3 : mise en page, animations, arrière‑plan, adaptabilité _
  
   _ JavaScript (Vanilla) : toute la logique du jeu (gestion du canvas, collisions, spawn des obstacles, événements clavier, musique)_

   _ Aucune bibliothèque externe n’a été utilisée !! _





# Fonctionnalités : 

  _Écran d’accueil avec musique d’ambiance (toggle ON/OFF)_

  _ Sélection d’un personnage parmi 5 figures politiques_

  _ Jeu en 2D sur canvas (1200×600)_

  _ Déplacement horizontal (touches Q/D ou flèches ← / →)_

  _ Saut (espace ou ↑) et accroupissement (flèche ↓)_

  _landmine (obstacles au sol)_

  _bombes (tombent verticalement du ciel)_

  _Bidon de pétrole (bonus +50 points)_

  _Score et distance affichés en temps réel_

  _outons Restart (relancer la partie) et Menu (retour à la sélection)_

  _Informations News / Support / Game Info dans la barre de navigation_



# LIEN VERS LE RENDu FINAL (GITHUB PAGES) :  

  ***https://MB2727.github.io/Mabrouki_Ahmed_Jeu_Obstacle-Distance/***



# Nouveautés Explorés :

  Le canvas HTML5 : dessin d’entités, gestion d’images, animations à 60 ips avec requestAnimationFrame
  
  Les collisions par boîtes englobantes (AABB) et l’ajustement des hitbox pour rendre le jeu plus indulgent

  Le préchargement des images pour éviter les clignotements et améliorer les performances

  La gestion d’une boucle audio en JavaScript (relecture automatique, contrôle ON/OFF)

  Le déplacement horizontal d’un personnage dans un jeu de type runner (contrairement au jeu du dinosaure classique)

  L’organisation du code en séparant la logique de mise à jour (updateGame) du rendu (draw)

  Le spawn dynamique d’obstacles avec des probabilités et des intervalles de temps

  La trajectoire linéaire des bombes (chute verticale à vitesse constante) indépendante du défilement horizontal



 # Difficultés rencontrées  :

   Le personnage « flottait » ou s’enfonçait dans le sol à cause d’une mauvaise correspondance entre sa hauteur et la coordonnée Y du sol.
   Solution : Redéfinir player.yGround comme le sommet du sol et placer le joueur à player.y = yGround - player.height.
   
   Les obstacles touchaient le joueur trop facilement, rendant le jeu impossible.
   Solution : Réduire les hitbox de 8 à 10 pixels de chaque côté
   
   Initialement, les bombes défilaient horizontalement depuis la droite sans jamais tomber vers le bas.
   Donner aux bombes une propriété ySpeed et les faire tomber verticalement, sans défilement horizontal.
   
   Saut trop faible pour passer au‑dessus des landmines .
   Solution : Ajuster jumpPower = -18 et gravity = 0.65 pour un saut plus haut et plus aérien.
  
   Le joueur ne pouvait pas se déplacer assez à droite pour éviter les bombes.
   Solution : Étendre player.maxX à 800 (au lieu de 500) dans un canvas de 1200 px.


   

***Enjoy the Game***


