/**
 * Die 34 Referenzen — verbatim aus index.html / referenzen.md.
 * `logo` ist der Pfad relativ zu public/ (für den Media-Upsert).
 */
const R = 'assets_marco/images/referenzen'
const BURGM_LOGO = 'assets_marco/webelem/Burgm_Logo_web.svg'

export type SeedReferenz = {
  einrichtung: string
  websiteUrl: string
  logo: string
  zitat?: string
  autorName?: string
  autorFunktion?: string
  projektInfo?: string
}

export const REFERENZEN: SeedReferenz[] = [
  {
    einrichtung: 'APH St. Katharinen Solothurn',
    websiteUrl: 'https://www.bgs-so.ch/',
    logo: `${R}/gemeinde-solothurn.webp`,
    zitat:
      'Du hast es geschafft, dass unsere Mitarbeitenden die Einstufungen als Herausforderung und nicht mehr als notwendiges Übel sehen. Sie haben seit der Schulung mit dir Freude daran, Levels richtig zuzuteilen.',
    autorName: 'Verena Abegglen',
    autorFunktion: 'Leitung Pflege und Betreuung APH St. Katharinen Solothurn',
  },
  {
    einrichtung: 'Seniorenzentrum Im Reiat',
    websiteUrl: 'https://www.imreiat.ch/',
    logo: `${R}/seniorenzentrum-im-reiat.svg`,
    zitat:
      'Das Vermitteln seiner Expertise auf einfache und vor allem praxisnahe Weise hat uns in der kurzen Zeit begeistert. Die Kontaktaufnahme war von Anfang an unkompliziert, ehrlich und auf Augenhöhe.',
    autorName: 'Melanie Roth',
    autorFunktion: 'Pflegedienstleitung Seniorenzentrum Im Reiat',
  },
  {
    einrichtung: 'Stiftung Loogarten',
    websiteUrl: 'https://www.loogarten.ch/',
    logo: `${R}/logo_loogarten.webp`,
    zitat:
      'Durch seine Interventionen haben wir eine sehr gute Einstufungsqualität erreicht und bekommen bei Audits von Krankenkassen positive Rückmeldungen.',
    autorName: 'Sandra Häfeli',
    autorFunktion: 'Leitung Pflege und Betreuung der Stiftung Loogarten',
  },
  {
    einrichtung: 'Sophie Guyer',
    websiteUrl: 'https://www.sophieguyer.ch/',
    logo: `${R}/sophie-guyer_logo.svg`,
    zitat:
      'Lieber Marco\nEs war für uns meeeeega wertvoll, von dir begleitet und unterstützt zu werden. Wir freuen uns schon jetzt auf die nächsten Tage!',
    autorName: 'Sandra Bundi',
    autorFunktion: 'Leitung Pflege & Betreuung',
    projektInfo: 'Juni 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.07.2025',
  },
  {
    einrichtung: 'Frohmatt',
    websiteUrl: 'https://www.frohmatt.waedenswil.ch/',
    logo: `${R}/frohmatt_logo.webp`,
    zitat:
      'Er versteht es, klar und auf Augenhöhe zu kommunizieren. Seine offene und überlegte Art macht die Zusammenarbeit mit ihm sehr angenehm.',
    autorName: 'Monika Pirovino-Zürcher',
    autorFunktion: 'Vorsitzende der Geschäftsleitung Frohmatt',
  },
  {
    einrichtung: 'Lindenhof',
    websiteUrl: 'https://www.lindenhof.sg/',
    logo: `${R}/lindenhof.webp`,
    zitat:
      'Er arbeitet zügig, zielorientiert und liefert rasch Rückmeldung, was ich als Geschäftsführer sehr zu schätzen weiss.',
    autorName: 'Christian Prasciolu',
    autorFunktion: 'Geschäftsführer / Vorsitzender der Geschäftsleitung',
  },
  {
    einrichtung: 'Altersheim Neuhof',
    websiteUrl: 'https://alterszentrum-neuhof.ch/',
    logo: `${R}/LG-Altersheim-Neuhof-Logo_RGB.svg`,
    zitat:
      'Professionelle Begleitung, individuell auf unsere Bedürfnisse abgestimmt. Flexible Gestaltung der Schulungstage. Vielen Dank, Marco, für die spannenden Tage! Besonders geschätzt habe ich deine Verbindlichkeit und die schnelle Rückmeldung bei Fragen.',
    autorName: 'Bettina Keller',
    autorFunktion: 'Pflegedienstleitung',
    projektInfo: 'April Mai 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.05.2025',
  },
  {
    einrichtung: 'Alterszentrum Bachtele',
    websiteUrl: 'https://alterszentrum-bachtele.ch/',
    logo: `${R}/Bachtele.png`,
    zitat:
      'Von A-Z sehr sympathisch, kompetent, praxisbezogen und humorvoll. Alles klappte vom Mail und Telefonkontakt bis hin zur Schulung. Das Team wird auf eine sehr positive, praxisbezogene und leicht verständliche Art geschult. Wir können ihn 100% weiterempfehlen.',
    autorName: 'Andrea Rüfenacht',
    autorFunktion: 'Pflegedienstleitung / Stv. Geschäftsleitung',
    projektInfo: 'Praxisorientierte Schulung für Supervisoren, Pflegehilfen und Pflegeassistenten',
  },
  {
    einrichtung: 'Blumenau',
    websiteUrl: 'https://blumenau.ch/',
    logo: `${R}/logo-blumenau.png`,
    zitat:
      'Dank Marco haben wir InterRAI LTCF schnell verstanden und sicher angewendet – praxisnah, verständlich und mit Humor. Allein hätten wir das nicht so hinbekommen!',
    autorName: 'Lea Graf',
    autorFunktion: 'Alters- und Pflegeheim Blumenau',
    projektInfo: 'Februar - März 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.04.2025',
  },
  {
    einrichtung: 'Zentrum Rämismühle',
    websiteUrl: 'https://zentrum-raemismuehle.ch/',
    logo: `${R}/logo_zentrum_raemismuehle.svg`,
    zitat:
      'Durch zahlreiche Praxisbeispiele aus seinem grossen Erfahrungsschatz schlägt Marco Burgmeijer eine hilfreiche Brücke zwischen der Theorie des RAI und dem Alltag der Pflegeeinstufung. Es hat sehr grossen Spass gemacht mit Marco zusammen zu arbeiten.',
    autorName: 'Eva Meier-Heusser',
    autorFunktion: 'Leitung Pflege und Betreuung',
    projektInfo: 'Februar - März 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.04.2025',
  },
  {
    einrichtung: 'Luegeten',
    websiteUrl: 'https://luegeten.ch/',
    logo: `${R}/luegeten.svg`,
    zitat:
      'Besonders beeindruckend ist seine empathische und gewinnende Art, mit der er sowohl Leitungspersonen als auch Mitarbeitende gleichermassen abholt. Er schafft es, komplexe Inhalte verständlich zu vermitteln und begleitet das gesamte Team mit wertvollem Rat.',
    autorName: 'Remo Fehlmann',
    autorFunktion: 'Geschäftsführer',
    projektInfo: 'Februar - März 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.04.2025',
  },
  {
    einrichtung: 'Lindehus im Spiegel (Pflegezentren Tösstal)',
    websiteUrl: 'https://www.pflegezentren-toesstal.ch/',
    logo: `${R}/lindehus-im-spiegel.svg`,
    zitat:
      "interRAI LTCF wurde kompetent, praxisnah, für alle verständlich und mit Humor erklärt.\nMit Marco's Hilfe und Unterstützung sind nun alle unsere Bewohner*innen korrekt im RAI-System eingestuft.",
    autorName: 'Arlette Brunner-Benz',
    autorFunktion: 'Dipl. Pflegefachfrau FH',
    projektInfo: 'April - Mai 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.06.2025',
  },
  {
    einrichtung: 'Alterswohnen Muttenz',
    websiteUrl: 'https://alterswohnen-muttenz.ch/',
    logo: `${R}/Logo_Alterswohnen_Muttenz.svg`,
    zitat: 'Klare Inhalte, praxisnah vermittelt, Marco versteht, was in der Praxis zählt.',
    autorName: 'Teilnehmer der Fortbildung',
    autorFunktion: 'Alterswohnen Muttenz',
    projektInfo: 'Mai 2025, interRAI-LTCF - Supervisor:innen – Vertiefungsfortbildung',
  },
  {
    einrichtung: 'Alterszentrum am Etzel',
    websiteUrl: 'https://www.az-etzel.ch/',
    logo: `${R}/logo-am-etzel.png`,
    zitat:
      'Marco hat uns bei der Umstellung von BESA auf RAI kompetent begleitet. Seine klare Art, sein Humor und praxisnahe Beispiele haben uns schnell fit für den Alltag mit RAI gemacht.',
    autorName: 'Claudia Tschümperlin',
    autorFunktion: 'Teamleitung',
    projektInfo: 'April - Mai 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.06.2025',
  },
  {
    einrichtung: 'Pflegezentrum Forch',
    websiteUrl: 'https://pflegezentrum-forch.ch/',
    logo: `${R}/logo_pflegezentrum_forch.svg`,
    zitat:
      'Marco hat die Umstellung von BESA auf RAI LTCF mit hoher Fachkompetenz und grossem Engagement begleitet. Der gesamte Prozess verlief strukturiert, effizient und reibungslos. Besonders hervorzuheben sind seine Expertise als RAI-Experte sowie die klare, praxisnahe Kommunikation. Wir empfehlen Marco mit voller Überzeugung weiter.',
    autorName: 'Kai Kröber',
    autorFunktion: 'Prozess- und Projektverantwortlicher Pflege',
    projektInfo: 'Mai - Juni 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.07.2025',
  },
  {
    einrichtung: 'Pflegezentrum Forch',
    websiteUrl: 'https://pflegezentrum-forch.ch/',
    logo: `${R}/logo_pflegezentrum_forch.svg`,
    zitat:
      'Eben war die Krankenkasse für ein Controlling zu Besuch, wir konnten alle Stufe halten, es war ein unkompliziertes Controlling, sie war sehr zufrieden mit unserer Arbeit. VIELEN DANK',
    autorName: 'Kai Kröber',
    autorFunktion: 'Prozess- und Projektverantwortlicher Pflege',
    projektInfo: 'September 2025, Controlling der Krankenkasse 3 Monate nach Go-Life',
  },
  {
    einrichtung: 'Pflegezentrum Wildbach Wetzikon',
    websiteUrl: 'https://www.wetzikon.ch/pflegezentrum/',
    logo: `${R}/Wetzikon_Pflegezentrum_Wildbach.svg`,
    zitat:
      'Du hast uns bei der Umstellung von BESA auf RAI begleitet. Mit deiner klaren Struktur und unkomplizierten Professionalität hast du dafür gesorgt, dass wir ein starkes Endergebnis erreicht haben, und dabei immer gute Stimmung im Team hatten. Vielen Dank Marco!',
    autorName: 'Anna Job',
    autorFunktion: 'Bereichsleitung / Stv. PDL',
    projektInfo: 'Juli - Oktober 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.10.2025',
  },
  {
    einrichtung: 'Luegeten',
    websiteUrl: 'https://luegeten.ch/',
    logo: `${R}/luegeten.svg`,
    zitat:
      'Das Krankenkassen-Controlling ist super verlaufen. Es wurden alle Einstufungen ohne Beanstandungen und Diskussion übernommen. Die Controllerin der Krankenkasse hat angemerkt, dass wir auf einem sehr guten und überraschend hohen Niveau wären, gerade, da wir erst seit diesem Jahr auf RAI umgestellt hatten. Möchte mich auch bei dir sehr herzlich bedanken, da du mit uns die Umstellung sehr gut vollzogen hast und die Mitarbeitenden sehr gut geschult sind.',
    autorName: 'Alexander Kranzdorf',
    autorFunktion: 'Teamleitung Pflege OG2+3 / Stv. LPB / RAI Verantwortlicher',
    projektInfo: 'Oktober 2025, Controlling der Krankenkasse 5 Monate nach Go-Life',
  },
  {
    einrichtung: 'OGRJ',
    websiteUrl: 'https://ogrj.ch/',
    logo: `${R}/logo-ogrj.png`,
    zitat:
      'Ich finde es großartig, wie praxisnah und auf das Wesentliche reduziert alles vermittelt wird, einfach verständlich und sehr hilfreich für den Pflegealltag.',
    autorName: 'Agnes Rüegg',
    autorFunktion: 'Pflegefachfrau HF',
    projektInfo: 'September-Oktober 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.11.2025',
  },
  {
    einrichtung: 'Alterszentrum Sunnetal',
    websiteUrl: 'https://www.sunnetal.ch/',
    logo: `${R}/alterszentrum-sunnetal.png`,
    zitat:
      'Marco vermittelt interRAI LTCF auf eine angenehme praxisnahe und motivierende Art, das macht das Lernen richtig spannend! Der Wechsel von BESA zu RAI ist für unser ganzes Team eine grosse Entlastung, weil wir viel weniger dokumentieren müssen und uns stärker auf die Pflege selbst konzentrieren können.',
    autorName: 'Fouzia Bashir',
    autorFunktion: 'Pflegefachfrau HF und BESA-Verantwortliche',
    projektInfo: 'August-Oktober 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.11.2025',
  },
  {
    einrichtung: 'Institut Menzingen',
    websiteUrl: 'https://kloster-menzingen.ch/',
    logo: `${R}/Logo_Kloster_Menzingen.svg`,
    zitat:
      'Ich möchte mich herzlich für die interne RAI-Weiterbildungen bedanken. Die Schulung war sehr praxisbezogen, abwechslungsreich gestaltet und hat uns wertvolle Einblicke für den Arbeitsalltag vermittelt. Durch die klare Struktur und die anschaulichen Beispiele konnten wir viel Neues mitnehmen und bestehendes Wissen vertiefen. Danke dir sehr.',
    autorName: 'Sanja Andrejic',
    autorFunktion: 'Pflegedienstleiterin, Institut Menzingen, Schwestern vom Heiligen Kreuz',
    projektInfo: 'Go-Life 01.01.2026',
  },
  {
    einrichtung: 'Kompetenzzentrum Oberarth',
    websiteUrl: 'https://kompetenzzentrum-oberarth.ch/',
    logo: `${R}/Logo-Kompetenzzentrum_Arth.png`,
    zitat:
      'Lieber Marco, als entschieden wurde, dass wir unser Abrechnungssystem von BESA auf RAI LTCF umstellen, dachten wir alle zuerst: Och nö… In den Schulungen wurde schnell klar, dass wir umdenken müssen. Da wir alle sehr BESA-geprägt sind, waren wir dankbar für deine Unterstützung. Mit deiner ruhigen, pragmatischen Art hast du uns gezeigt, dass das System, einmal verstanden, vieles erleichtert. Von deinen Tagen bei uns konnten wir sehr profitieren. Es hat uns sogar begonnen, Spass zu machen, und wir sind nun gut aufgestellt für die Umstellung. Dir ganz herzlichen Dank für deine Begleitung.',
    autorName: 'Ursula Heinl',
    autorFunktion: 'stv. PDL & Qualitätsverantwortliche Pflege',
    projektInfo: 'Oktober – Dezember 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.01.2026',
  },
  {
    einrichtung: 'APH Lachen (Biberzelten)',
    websiteUrl: 'https://www.aph-lachen.ch/',
    logo: `${R}/logo-aph-lachen.svg`,
    zitat:
      'Marco strahlt grosse Sicherheit aus und ist eine verlässliche Ansprechperson. Die Vermittlung des komplexen Fachwissens ist hervorragend auf die Pflegepraxis zugeschnitten. Deine didaktische Herangehensweise schafft spürbare Motivation. Vielen Dank!',
    autorName: 'Ramona Fröhli',
    autorFunktion: 'Bereichsleitung Pflege & Betreuung',
    projektInfo: 'Oktober – Dezember 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.01.2026',
  },
  {
    einrichtung: 'Im Spitz Pflegezentrum Kloten',
    websiteUrl: 'https://www.kloten.ch/aemter/3755',
    logo: `${R}/im-spitz-pflegezentrum.jpg`,
    zitat:
      'In den Monaten vor der Umstellung von BESA auf RAI hat uns Marco eng begleitet und sein praxisnahes Fachwissen war für eine erfolgreiche Umsetzung entscheidend. Ohne seine Unterstützung hätten die Koordinatoren- und Supervisoren-Schulungen allein nicht denselben Effekt erzielt. Dank ihm konnten wir die Bewohnerinnen und Bewohner korrekt und fundiert einstufen – sein Einsatz war für unseren Betrieb ein echter Mehrwert.',
    autorName: 'Meltem Aykol',
    autorFunktion: 'Leitung Station 3',
    projektInfo: 'Oktober 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.01.2026',
  },
  {
    einrichtung: 'Seniorenzentrum Engelhof',
    websiteUrl: 'https://seniorenzentrum-engelhof.ch/',
    logo: `${R}/Engelhof_Logo.svg`,
    projektInfo: 'Dezember 2025, Wechsel von BESA auf interRAI LTCF, Go-Life 01.01.2026',
  },
  {
    einrichtung: 'Öffentliche interRAI LTCF Grundschulung',
    websiteUrl: 'https://www.rai-experte.ch',
    logo: BURGM_LOGO,
    zitat:
      'Marco kann das Wichtige vom Unwichtigen trennen und das eindrücklich erklären. Inhalt und Durchführung war sehr überzeugend, Marco präsentiert sehr angenehm.',
    autorName: 'Yvonne HF und Doris FaGe',
    projektInfo: 'Öffentliche interRAI LTCF Grundschulung, 21. Januar 2026',
  },
  {
    einrichtung: 'Öffentliche interRAI LTCF Aufbauschulung',
    websiteUrl: 'https://www.rai-experte.ch',
    logo: BURGM_LOGO,
    zitat:
      'Lieber Marco, Deine Schulung mit vielen Praxisbeispielen hat meinen Buchstaben und Zahlensalat im Kopf sortiert. Danke für Deine tolle Unterstützung.',
    autorName: 'Birgit',
    autorFunktion: 'Supervisorin',
    projektInfo: 'Öffentliche interRAI LTCF Aufbauschulung, 28. Januar 2026',
  },
  {
    einrichtung: 'Kompetenzzentrum Gesundheit und Alter Oberarth',
    websiteUrl: 'https://kompetenzzentrum-oberarth.ch/',
    logo: `${R}/oberarth.jpg`,
    zitat:
      'Lieber Marco, nun sind alle drei Audits von den Krankenkassen bearbeitet worden. Alle Entscheide sind für uns positiv ausgefallen. Danke nochmals für deine Tipps, sie haben uns ein gutes Stück weitergebracht.',
    autorName: 'Ursula Heinl',
    autorFunktion: 'stv. PDL & Qualitätsverantwortliche Pflege',
    projektInfo: 'Kompetenzzentrum Gesundheit und Alter Oberarth, Go-Life 01.01.2026, Audits März 2026',
  },
  {
    einrichtung: 'Kompetenzzentrum Gesundheit und Alter Oberarth',
    websiteUrl: 'https://kompetenzzentrum-oberarth.ch/',
    logo: `${R}/oberarth.jpg`,
    zitat:
      'Vielen Dank, Marco. Die Schulung war spannend, prägnant und sehr kurzweilig. Sie hat mir sehr geholfen und mich gleichzeitig motiviert.',
    autorName: 'Regula Winkler',
    autorFunktion: 'Pflegehelferin SRK',
    projektInfo: 'Kompetenzzentrum Gesundheit und Alter Oberarth, 3 H Basisschulung interRAI LTCF, 04.03.2026',
  },
  {
    einrichtung: 'Alterszentrum Böndler',
    websiteUrl: 'https://www.boendler.ch/',
    logo: `${R}/boendler.jpg`,
    zitat:
      'Lieber Marco, vielen Dank für die grossartigen Begleittage. Du hast uns das RAI nicht nur sehr kompetent, sondern auch sehr verständnisvoll näher gebracht. Wir sind jetzt gut für die kommende Zeit gerüstet. Danke für deinen Einsatz und deine Ermutigungen. Und ja, es wird wirklich einfacher.',
    autorName: 'Miriam Wiedmer',
    autorFunktion: 'Pflegedienstleitung',
    projektInfo: 'Februar – April 2026, Wechsel von BESA auf interRAI LTCF, Go-Life 01.04.2026',
  },
  {
    einrichtung: 'Haus Tabea',
    websiteUrl: 'https://www.tabea.ch/',
    logo: `${R}/haustabea.jpg`,
    zitat:
      'Lieber Marco, deine RAI-Schulungen waren für mich sehr bereichernd. Besonders wertvoll fand ich deine praxisnahen Beispiele und persönlichen Erfahrungen. Deine offene Art, dein angenehmes Tempo und deine klare Ausdrucksweise haben es mir leicht gemacht, dir auch über längere Zeit hinweg aufmerksam zu folgen. Die Teilnahme hat mir geholfen, die Inhalte zu vertiefen und ein sicheres Verständnis für die RAI-Sprache und ihre Anwendung zu entwickeln.',
    autorName: 'Karin Daunois',
    autorFunktion: 'Stationsleiterin Alterspsychiatrie',
    projektInfo: 'Januar – April 2026, Wechsel von BESA auf interRAI LTCF, Go-Life 01.04.2026',
  },
  {
    einrichtung: 'Zentrum im Hof',
    websiteUrl: 'https://www.zentrumimhof.ch/',
    logo: `${R}/zentrum-im-hof.jpg`,
    zitat:
      'Lieber Marco, ohne deine Hilfe würden wir jetzt schwimmen, du hast uns mit deinen Schulungen fit gemacht und befähigt. Und es hat auch noch Spass gemacht. Vielen Dank!',
    autorName: 'Christa De Mey',
    autorFunktion: 'Leitung stationäre Pflege',
    projektInfo: 'Februar 2026, Wechsel von BESA auf interRAI LTCF, Go-Life 01.04.2026',
  },
  {
    einrichtung: 'Grünhalde',
    websiteUrl: 'https://www.gruenhalde.ch/',
    logo: `${R}/GH-Logo.png`,
    zitat:
      'Lieber Marco, herzlichen Dank für die spannende und lehrreiche Schulung für Supervisoren letzte Woche. Du hast den Tag abwechslungsreich gestaltet und mit praxisnahen Beispielen die Aufgaben klar vermittelt. Besonders hilfreich war, wie du auf Fragen eingegangen bist und motivierende, klare Antworten geben konntest. Vielen Dank!',
    autorName: 'Nerina Selemovic',
    autorFunktion: 'Leiterin Pflege',
    projektInfo: 'Öffentliche interRAI LTCF Aufbauschulung, 28. Januar 2026',
  },
  {
    einrichtung: 'Sophie Guyer',
    websiteUrl: 'https://www.sophieguyer.ch/',
    logo: `${R}/sophie-guyer_logo.svg`,
    zitat:
      'Lieber Marco, das Ergebnis der Schulung sind hochmotivierte Mitarbeitende der Basis, die den Sinn verstanden haben und sich nun besser in den Prozess einlassen können. Sie fühlen sich wichtig und wertgeschätzt. Vielen Dank!',
    autorName: 'Sandra Bundi',
    autorFunktion: 'Leitung Pflege & Betreuung',
    projektInfo: 'Inhouse Schulung ½ Tag Supervisoren + ½ Tag Pflegehelfer:innen, 17. April 2026',
  },
]
