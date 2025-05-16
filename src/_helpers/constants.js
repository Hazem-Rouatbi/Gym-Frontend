import environment from './environment';

export const reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const Expects = [
    {

        titleEn: "Regorous training",
        descriptionEn: "Regorous training that will leave you statisfied and in shape",
        titleFr: "Entrainement Rigoureux",
        descriptionFr: "Un entraînement rigoureux qui vous laissera satisfait et en forme",
        img: require('@assets/expects/expect1.jpg'),
    },
    {
        titleEn: "Professional supervision",
        descriptionEn: "The best professional help you can get anywhere",
        titleFr: "Supervision professionnelle",
        descriptionFr: "La meilleure aide professionnelle que vous puissiez obtenir",
        img: require('@assets/expects/expect2.jpg'),
    },
    {
        titleEn: "Varied Equipement",
        descriptionEn: "Equipment a plenty so you can use whatever you are comfortable with",
        titleFr: "Equipement abondant",
        descriptionFr: "Équipement abondant pour que vous puissiez utiliser ce avec quoi vous êtes à l'aise",
        img: require('@assets/expects/expect3.jpg'),
    }
]

export const placeHolderPosts = [
    {
        id: 1,
        title: 'post 1',
        discreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',

        likes: 10,
        liked: true,
        comments: [{ username: 'user 1', comment: ' ullamco laboris nisi ut aliquip exLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex' }, { username: 'user 2', comment: 'comment 2' }]
    },
    {
        id: 2,
        discreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
        img: 'https://picsum.photos/400/300',
        likes: 10,
        comments: [{ username: 'user 1', comment: 'comment 1' }, { username: 'user 2', comment: 'comment 2' }]
    },
    {
        id: 3,
        title: 'post 3',
        discreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
        img: 'https://picsum.photos/400/300',
        likes: 2,
        comments: [{ username: 'user 1', comment: 'comment 1' }, { username: 'user 2', comment: 'comment 2' }]
    }
]

export const PlaceHolderCalendarItems = [
    {
        title: "10-6-2024",
        data: [
            {
                hour: "10:00",
                duration: "1h",
                title: "title 1",
                fullWorkout: [{ hour: "10:00", duration: "00:10:00", title: "workout1" },
                { hour: "10:10", duration: "00:05:00", title: "workout2" }, { hour: "10:15", duration: "00:00:30", title: "workout3" },
                { hour: "10:00", duration: "00:10:00", title: "workout1" },
                { hour: "10:10", duration: "00:05:00", title: "workout2" }, { hour: "10:15", duration: "00:00:30", title: "workout3" },
                { hour: "10:00", duration: "00:10:00", title: "workout1" },
                { hour: "10:10", duration: "00:05:00", title: "workout2" }, { hour: "10:15", duration: "00:00:30", title: "workout3" }]
            },
            {
                hour: "10:00",
                duration: "1h",
                title: "title 2",
                fullWorkout: [{ hour: "10:00", duration: "00:10:00", title: "workout1" },
                { hour: "10:10", duration: "00:05:00", title: "workout2" }, { hour: "10:15", duration: "00:00:30", title: "workout3" }]
            }
        ]
    }
]
export const ArrowDownIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<g data-name="Layer 2">
<g data-name="arrow-ios-downward">
<rect width="24" height="24" opacity="0"/>
<path 
d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1
 1 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16z"/>
 </g></g>
 </svg>`

export const BaseUrl = environment.serverUrl+':'+environment.port

