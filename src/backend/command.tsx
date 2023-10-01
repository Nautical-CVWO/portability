import { db } from "./firebase";
import { ref, set, get, push, update, remove } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { User } from "../pages/Homepage";
import { SelfAssessmentUser } from "../pages/EmployeeSelfAssessment";

const writeEmployeeData = async (
  email: string,
  password: string,
  id: number,
  name: string,
  gender: string,
  education: string,
  position: string,
  performance: number,
  skillsReview: string,
  communication_score: number,
  creativity_score: number,
  problem_solving_score: number,
  teamwork_score: number,
  time_management_score: number,
  feedback: string,
  isNew: boolean = true,
  isAdmin: boolean = false,
): Promise<any> => {
  const auth = getAuth();

  try {
    if (isNew) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    }

    const user = await readCurrentUserData();

    const dataLocation = "employees";
    const reference = ref(db, `${dataLocation}/${user}/`);

    const snapshot = await get(reference);

    if (snapshot.exists() && isNew) {
      console.log("Invalid id: id already exists in Employee Data");
      // You can handle this case as needed, e.g., throw an error
      throw new Error("Invalid id: id already exists in Employee Data");
    } else {
      if (isNew) {
        await set(ref(db, `${dataLocation}/${user}/`), {
          name,
          email,
          gender,
          education,
          position,
          performance,
          skillsReview,
          id,
          // Set a default value of 0 for a property (e.g., points)
          points: 0,
          isAdmin: isAdmin
        });
      } else {
        // We update instead
        update(ref(db, `employees/${user}/`), {
          name,
          email,
          gender,
          education,
          position,
          performance,
          skillsReview,
          id,
          isAdmin
        });
      }

      writeSkillsData(user, communication_score, creativity_score, problem_solving_score, teamwork_score, time_management_score);
      // feedback not written by employer
      // writeFeedbackData(user, feedback);
      return user; // Return user.uid on success
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error:", error.message);
    }
    // Handle the error as needed
    throw error;
  }
};

const writeLoginData = (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const dataLocation = "employees";
    // const reference = ref(db, `${dataLocation}/${id}/`);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        // Signed in
        const user = userCredential.user;
        const reference = ref(db, `${dataLocation}/${user.uid}/`);
        get(reference)
          .then((snapshot) => {
            if (snapshot.exists()) {
              alert("Successfully signed in");
              resolve("Successfully signed in")
            }
          })
          .catch((error) => {
            reject("Failed to fetch data:" + error.message);
          });
      })
      .then((res: any) => {
        resolve("Successfully signed in")
      })
      .catch((error: any) => {
        console.log(error.message)
        reject(error.message);
      });
  });

};

const writeSkillsData = (
  uid: string,
  communication_score: number,
  creativity_score: number,
  problem_solving_score: number,
  teamwork_score: number,
  time_management_score: number
): void => {
  const dataLocation = "skills";
  const reference = ref(db, `${dataLocation}/${uid}/`);
  get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Invalid id: id already exists in Skills Data");
        return;
      }
    })
    .catch((error) => {
      console.log("Failed to fetch data:", error.message);
    });
  set(ref(db, `${dataLocation}/${uid}/`), {
    communication: communication_score,
    creativity: creativity_score,
    problem_solving: problem_solving_score,
    teamwork: teamwork_score,
    time_management: time_management_score,
  });
};

const readSkillMeanData = async (): Promise<any> => {
  const dataLocation = "skill_means";
  const reference = ref(db, `${dataLocation}/`);
  const data = await get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
    })
    .catch((error) => {
      console.log("Failed to fetch data:", error.message);
    });
  return data;
};

const readUserData = async (uid: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const dataLocation = "employees";
    const reference = ref(db, `${dataLocation}/${uid}`);
    await get(reference)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
          resolve(snapshot.val());
        }
      })
      .catch((error) => {
        reject("Failed to fetch data:");
      });


  })
}


const readUserEmails = async (): Promise<any> => {
  const dataLocation = "employees";
  const reference = ref(db, `${dataLocation}/`);
  const data = await get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
    })
    .catch((error) => {
      console.log("Failed to fetch data:", error.message);
    });
  return data;
}


const readCurrentUserData = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      }
      // else {
      //     reject(new Error("Something wrong"));
      // }
      // Don't forget to unsubscribe when done.
      unsubscribe();
    });
  });
};


// deprecated
const writeSatisfactionData = (
  id: number,
  workplaceSatisfaction_score: number,
  colleagueSatisfaction_score: number
): void => {
  const dataLocation = "satisfaction";
  const reference = ref(db, `${dataLocation}/${id}/`);
  get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Invalid id: id already exists in Satisfaction Data");
        return;
      }
    })
    .catch((error) => {
      console.log("Failed to fetch data:", error.message);
    });
  set(ref(db, `${dataLocation}/${id}/`), {
    workplaceSatisfaction: workplaceSatisfaction_score,
    colleagueSatisfaction: colleagueSatisfaction_score,
  });
};

const writeFeedbackData = (uid: string, feedback: string): void => {
  const dataLocation = "feedback";
  const reference = ref(db, `${dataLocation}/${uid}/`);
  const feedbackData: { [key: string]: string } = {};
  feedbackData[uid] = feedback;
  get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Invalid id: id already exists in Feedback Data");
        return;
      }
    })
    .catch((error) => {
      console.log("Failed to fetch data:", error.message);
    });
  update(ref(db, `${dataLocation}/`), feedbackData);
};

const writeSelfAssessmentData = (usr: SelfAssessmentUser): void => {
  const referencePoint = ref(db, `employees/${usr.uid}`);
  get(referencePoint)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let currSkillsReview = snapshot.val().skillsReview;
        console.log(currSkillsReview);
        const newSkillsReview = currSkillsReview + "\nThe employee will like to learn the following skills: " + usr.skillsReview;
        update(ref(db, `employees/${usr.uid}/`), { "skillsReview": newSkillsReview, "name": usr.name, "education": usr.education, "position": usr.position, "gender": usr.gender });
        writeFeedbackData(usr.uid, usr.feedback);
      }
    })
}

const writeCertData = (uid: string, url: string): void => {
  const dataLocation = "certificate";
  const certUrl = {
    url: url
  }
  push(ref(db, `${dataLocation}/${uid}`), certUrl);
  const participantsData: { [key: string]: string } = {};
  participantsData[uid] = uid;
  const referencePoint = ref(db, `employees/${uid}`);
  get(referencePoint)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let currPoints = Number(snapshot.val().points);
        currPoints = Number(currPoints) + Number(50);
        update(ref(db, `employees/${uid}/`), { "points": currPoints });

      }
    })
};

const logoutData = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signOut(auth).then(() => {
      resolve("Successfully logged out")
    }).catch((error) => {
      reject(error.message)
    });
  });
};

const writeWorkshopData = (
  workshopName: string,
  workshopPoint: number,
  workshopDate: string,
  uid: string
): void => {
  const dataLocation = "workshops";
  const reference = ref(db, `${dataLocation}/${workshopName}`);
  get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Invalid id: id already exists in Workshop Data");
        return;
      }
    })
    .catch((error) => {
      console.log("Failed to fetch data:", error.message);
      return;
    });
  set(reference, {
    workshopName: workshopName,
    workshopPoint: workshopPoint,
    workshopDate: workshopDate,
    addedBy: uid
  });
};

const checkUserIsParticipating = async (uid: string, workshopName: string): Promise<boolean> => {
  const reference = ref(db, `workshops/${workshopName}/participants/${uid}`);

  try {
    const snapshot = await get(reference);
    return snapshot.exists();
  } catch (error) {
    console.error("Error checking participation:", error);
    return false;
  }
}

const participateWorkshop = (
  uid: string,
  workshopName: string,
  workshopPoint: number
): void => {
  const reference = ref(db, `workshops/${workshopName}/participants/${uid}`);
  console.log(uid);
  get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Invalid: id already participating in " + { workshopName });
        return;
      }
    })
    .catch((error) => {
      console.log("Failed to fetch data:", error.message);
      return;
    });
  const participantsData: { [key: string]: string } = {};
  participantsData[uid] = uid;
  update(ref(db, `workshops/${workshopName}/participants/`), participantsData);
  const referencePoint = ref(db, `employees/${uid}`);
  get(referencePoint)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let currPoints = Number(snapshot.val().points);
        currPoints = Number(currPoints) + Number(workshopPoint);
        update(ref(db, `employees/${uid}/`), { "points": currPoints });

      }
    })
}

const cancelParticipation = (
  uid: string,
  workshopName: string,
  workshopPoint: number
): void => {
  const reference = ref(db, `workshops/${workshopName}/participants/${uid}`);
  get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Invalid: id is already not participating in " + { workshopName });
        remove(reference);

        const referencePoint = ref(db, `employees/${uid}`);
        get(referencePoint)
          .then((snapshot) => {
            if (snapshot.exists()) {
              let currPoints = Number(snapshot.val().points);
              currPoints -= workshopPoint;
              update(ref(db, `employees/${uid}/`), { "points": currPoints });

            }
          })
          .catch((error) => {
            console.log("Failed to fetch data:", error.message);
            return;
          });
      }
    })
    .catch((error) => {
      console.log("Failed to fetch data:", error.message);
      return;
    });
}

const deleteWorkshop = (
  workshopName: string,
  workshopPoint: number
): void => {
  const reference = ref(db, `workshops/${workshopName}/participants`);
  get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const participants = Object.values(snapshot.val());
        for (let i = 0; i < participants.length; i++) {
          let uid = participants[i];
          const referencePoint = ref(db, `employees/${uid}`);
          get(referencePoint)
            .then((snapshot) => {
              if (snapshot.exists()) {
                let currPoints = Number(snapshot.val().points);
                currPoints -= workshopPoint;
                update(ref(db, `employees/${uid}/`), { "points": currPoints });
              }
            })
            .catch((error) => {
              console.log("Failed to fetch data:", error.message);
              return;
            });
        }
      }
    })
    .catch((error) => {
      console.log("Failed to fetch data:", error.message);
      return;
    });
  remove(ref(db, `workshops/${workshopName}`));
}


const findCertificateKeyByUrl = async (uid: string, urlToFind: string) => {
  try {
    const certificateRef = ref(db, `certificate/${uid}`);
    const snapshot = await get(certificateRef);

    if (snapshot.exists()) {
      const certificates = snapshot.val();
      for (const key in certificates) {
        if (certificates[key].url === urlToFind) {
          return key; // Return the key when the URL matches
        }
      }
    }
  } catch (error) {
    console.error("Error finding certificate key:", error);
  }

  return null; // Return null if the URL is not found
};

const handleDeleteCertificate = async (uid: string, certificateUrl: string) => {
  try {
    // Remove the certificate from the database
    const certificateRef = ref(db, `certificate/${uid}`);
    const snapshot = await get(certificateRef);
    if (snapshot.exists()) {
      const certificates = snapshot.val();
      const updatedCertificates = { ...certificates };
      const key = await findCertificateKeyByUrl(uid, certificateUrl);
      delete updatedCertificates[key as string];
      await set(ref(db, `certificate/${uid}`), updatedCertificates);
    }

    // Update user's points
    const userRef = ref(db, `employees/${uid}`);
    const userSnapshot = await get(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      const currPoints = userData.points || 0;
      const newPoints = currPoints - 50; // Subtract 50 points for deleting a certificate
      await update(ref(db, `employees/${uid}`), { points: newPoints });
    }
  } catch (error) {
    console.error("Error deleting certificate:", error);
  }
};



export {
  writeEmployeeData,
  writeLoginData,
  readSkillMeanData,
  readCurrentUserData,
  readUserData,
  writeCertData,
  writeWorkshopData,
  logoutData,
  checkUserIsParticipating,
  readUserEmails,
  participateWorkshop,
  cancelParticipation,
  deleteWorkshop,
  handleDeleteCertificate,
  writeSelfAssessmentData
};
