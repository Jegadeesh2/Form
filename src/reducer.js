const reducer = (state, action) =>{

  switch(action.type){
    case "ADD_ITEM" : 
    const newStudents = [...state.students, action.load];
    return {
      ...state,
      students: newStudents,
      isNotification: true,
      messageText: `Name : ${action.load.name} is added below`,
    };
    case "NO_ITEM" :
      return {
        ...state,
        isNotification: true,
        messageText: `Please fill out all required fields...`
      };
    case "DELETE_USER":
      const remainingStudents = state.students.filter(
        (student)=> student.id !== action.load)
      return {
        ...state,
        students: remainingStudents,
        isNotification: true,
        messageText: ` Your application has been removed.! `
      }
      case "CLOSE_NOTIFICATION" :
        return{
          ...state,
          isNotification : false,
          messageText : ""
        }
        default: 
        return{...state}
  }
};

export default reducer