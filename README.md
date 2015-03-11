# WebGL EKI keelekorpuse 3D
WebGL tehnoloogia abil [EKI tekstikorpuse](http://eki.ee/corpus/stats1.html]) analüüsi tulemuste kujutamine 3D ruumis.

## Kasutamine
Avage brauseris index.html (topeltklikk failil).
2. ja 3. slaidil saab kaamerat ruumis hiirega liigutada.

## Sisukokkuvõte
Presentatsiooni eesmärgiks on võrrelda eesti keeles kasutatavate märkide sagedusi.
Märkide sagedusanalüüs on üks vahend keele uurimisel.

3D-graafiliselt on kujutatud üksikute märkide sagedus korpuses. Märke on kokku 80,6 miljonit.
Suurima sagedusega esineb tühik (10'326'452), millele järgnevad A (8'100'857) ja E (7'028'435).

Keelekorpuste statistika üheks rakendusvaldkonnaks on krüptograafia.
Näiteks saab murda afiinset šifrit kui kõrvutada tähtede sagedusi krüptogrammis ja keelekorpuses.

## Tehnoloogiad
- **WebGL**: renderdab 3D graafikat brauseris.
- **Three.js**: 3D objektide programmeerimine.
- **JQuery**: dünaamiline HTML.

## Teostus
- Andmed on failis static/js/data.js.
- Teise slaidi aluseks on three.js näidis http://threejs.org/examples/#css3d_periodictable
Muutsin on kanvase sisu, objektide paigutamist ja disaini.
- Kolmanda slaidi aluseks on three.js näidis http://threejs.org/examples/#canvas_geometry_cube
Risttahukad on tehtud Mesh objektidest, kusjuures andmeid näitav pealmine tahk on 0-paksusega Mesh.
Lisasin Ambient valgustuse.

## Kasutatud materjalid
- **[EKI](http://eki.ee/corpus)**
- **[Inglise keele mnemoon](http://norvig.com/mayzner.html)**

## Lisa
- **[Lähtekood GitHubis](https://github.com/kristoaun/webgl-eki-tekstikorpus)**
- **[Veebis](http://momo.koodur.com/proxy-apache2/ttu/multimeedia/index.html)**