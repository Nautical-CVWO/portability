import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React, {  } from 'react';
import bgm from '../assets/bgm.png'

export const MediaDataSet = {
  BGM: bgm,
}

export interface TipsCard {
  media: keyof typeof MediaDataSet;
  title: string;
  description: string;
  link: string;
}

export interface TipsProps {
  uid: string;
  cards: TipsCard[];
}

const Tips: React.FC<TipsProps> = ({uid, cards}: TipsProps) => { 

    // const navigate = useNavigate();
    // const [user, setUser] = useState<User | undefined>();

    // const handleSetUser = (newUser: User | undefined) => {
    //     setUser(newUser);
    // };
    // useEffect(() => {
    //     readCurrentUserData()
    //     .then((res) => {
    //         readUserData(res).then((result) => {
    //             const user: User = {
    //                 uid: res,
    //                 points: result.points ? result.points : 0,
    //                 username: result.name,
    //                 // Add other properties as needed
    //             };
    //             setUser(user);
    //         }).catch((err) => {
    //             throw new Error(err.message)
    //         })
            
    //     }).catch((err) => {
    //         throw new Error(err.message)
    //     })
    // }, []);

    return (
    <div style={{ height: '100vh', backgroundImage: `url(${bgm})`, backgroundSize: 'cover', paddingTop: '10%' }}>
        <Card sx={{ marginLeft: '12%', marginRight: '12%',
                    display: 'flex', alignItems: 'center',
                    flexDirection: "column", backgroundColor: "#404040",
                    opacity: '90%'}}>
            {cards.map((card: TipsCard) => {
                return (
                    <Card sx={{ minWidth: '69vw', margin: '10px', border: '1px solid #a4d302' }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={MediaDataSet[card.media]}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {card.description}
                        </Typography>
                        </CardContent>
                        <CardActions>
                        <Button size="small" href={`${card.link}`}>Go to Resource</Button>
                        </CardActions>
                    </Card>
                )
            })}
        </Card>
    </div>

    );
  
}

export default Tips;