import { db } from './firebase';
import { ref, set, get, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const writeEmployeeData = async (
    email: string,
    password: string,
    id: number,
    name: string,
    gender: string,
    education: string,
    position: string,
    performance: number
): Promise<any> => {
    const auth = getAuth();
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const dataLocation = "employees";
        const reference = ref(db, `${dataLocation}/${user.uid}/`);

        const snapshot = await get(reference);

        if (snapshot.exists()) {
            console.log('Invalid id: id already exists in Employee Data');
            // You can handle this case as needed, e.g., throw an error
            throw new Error('Invalid id: id already exists in Employee Data');
        } else {
            await set(ref(db, `${dataLocation}/${user.uid}/`), {
                name: name,
                gender: gender,
                education: education,
                position: position,
                performance: performance
            });
            return user.uid; // Return user.uid on success
        }
    } catch (error: any) {
        console.log('Error:', error.message);
        // Handle the error as needed
        throw error;
    }
};

const writeLoginData = (
    email: string,
    password: string
  ): void => {
    const dataLocation = "employees";
    // const reference = ref(db, `${dataLocation}/${id}/`);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const reference = ref(db, `${dataLocation}/${user.uid}/`);
        get(reference)
        .then((snapshot) => {
            if (snapshot.exists()) {
                alert('Successfully signed in');
            }
        }).catch((error) => {
            console.log('Failed to fetch data:', error.message);
        });
    })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    

};

const writeSkillsData = (
    id: number,
    communication_score: number,
    creativity_score: number,
    problem_solving_score: number,
    teamwork_score: number,
    time_management_score: number
  ): void => {
    const dataLocation = "skills";
    const reference = ref(db, `${dataLocation}/${id}/`);
    get(reference)
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log('Invalid id: id already exists in Skills Data');
                return;
            }
        }).catch((error) => {
            console.log('Failed to fetch data:', error.message);
        });
    set(ref(db, `${dataLocation}/${id}/`), {
        communication: communication_score,
        creativity: creativity_score,
        problem_solving: problem_solving_score,
        teamwork: teamwork_score,
        time_management: time_management_score
    });
};

const readSkillMeanData = async (
  ): Promise<any> => {
    const dataLocation = "skill_means";
    const reference = ref(db, `${dataLocation}/`);
    const data = await get(reference)
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        }).catch((error) => {
            console.log('Failed to fetch data:', error.message);
        });
    return data;
};

const writeSatisfactionData = (
    id: number,
    workplaceSatisfaction_score: number,
    colleagueSatisfaction_score: number,
  ): void => {
    const dataLocation = "satisfaction";
    const reference = ref(db, `${dataLocation}/${id}/`);
    get(reference)
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log('Invalid id: id already exists in Satisfaction Data');
                return;
            }
        }).catch((error) => {
            console.log('Failed to fetch data:', error.message);
        });
    set(ref(db, `${dataLocation}/${id}/`), {
        workplaceSatisfaction: workplaceSatisfaction_score,
        colleagueSatisfaction: colleagueSatisfaction_score
    });
};

const writeFeedbackData = (
    id: number,
    feedback: string
  ): void => {
    const dataLocation = "feedback";
    const reference = ref(db, `${dataLocation}/${id}/`);
    const feedbackData: { [key: number]: string } = {};
    feedbackData[id] = feedback;
    get(reference)
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log('Invalid id: id already exists in Feedback Data');
                return;
            }
        }).catch((error) => {
            console.log('Failed to fetch data:', error.message);
        });
    update(ref(db, `${dataLocation}/`), feedbackData);
};

export {
    writeEmployeeData,
    writeSkillsData,
    writeSatisfactionData,
    writeLoginData,
    writeFeedbackData,
    readSkillMeanData
};
