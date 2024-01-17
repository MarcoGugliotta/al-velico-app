import Career from "../models/Career";

export default function getDafaultCareer(): Career {
    const career: Career = {
        percentageCompletion: 0,
        startDate: undefined,
        lastUpdate: undefined,
        name: 'Windsurf',
        actived: false,
        levels: [{
            name: "Principiante",
            movements: [{
                name: "Trasporto della tavola",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Trasporto della tavola',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Partenza",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Partenza',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Rotazione di prua",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Rotazione di prua',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Rotazione di poppa",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Rotazione di poppa',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Orzare",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Orzare',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Puggiare",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Puggiare',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Navigare in sicurezza",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Navigare in sicurezza',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Andatura di bolina",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Andatura di bolina',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Andatura di traverso",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Andatura di traverso',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Andatura di lasco",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Andatura di lasco',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Andatura di poppa",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Andatura di poppa',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Virata semplice",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Virata semplice',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Strambata semplice",
                difficulty: "Facile",
                videoTutorial: {
                    name: 'Strambata semplice',
                    path: 'https://www.youtube.it'
                }
            }]
        },{
            name: "Intermedio",
            movements: [{
                name: "Partenza dalla spiaggia",
                difficulty: "Media",
                videoTutorial: {
                    name: 'Partenza dalla spiaggia',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Strambata pivot",
                difficulty: "Media",
                videoTutorial: {
                    name: 'Strambata pivot',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Trapezio",
                difficulty: "Media",
                videoTutorial: {
                    name: 'Trapezio',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Virata avanzata",
                difficulty: "Media",
                videoTutorial: {
                    name: 'Virata avanzata',
                    path: 'https://www.youtube.it'
                }
            }]
        },{
            name: "Avanzato",
            movements: [{
                name: "Planare",
                difficulty: "Difficile",
                videoTutorial: {
                    name: 'Planare',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Evitare lo spin out",
                difficulty: "Difficile",
                videoTutorial: {
                    name: "Evitare lo spin out",
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Salto",
                difficulty: "Difficile",
                videoTutorial: {
                    name: 'Salto',
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Partenza dall'acqua",
                difficulty: "Difficile",
                videoTutorial: {
                    name: "Partenza dall'acqua",
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Power Jibe",
                difficulty: "Difficile",
                videoTutorial: {
                    name: "Power Jibe",
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Virata Power",
                difficulty: "Difficile",
                videoTutorial: {
                    name: "Virata Power",
                    path: 'https://www.youtube.it'
                }
            },{
                name: "Virata Power",
                difficulty: "Difficile",
                videoTutorial: {
                    name: "Virata Power",
                    path: 'https://www.youtube.it'
                }
            }]
        }]
    };
    return career;
}
