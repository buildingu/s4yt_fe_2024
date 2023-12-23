// const businessMap = [
//   {
//     name: "businessName",
//     img: "logo",
//   },
//   {
//     name: "businessName",
//     img: "logo",
//   },
// ];

type BusinessDetailsType = 
{
  // object key can be business's name or we can use an ID for each business
  [key: string]: {
    name: string,
    logo: string,
    subtitle: string,
    // number of answered questions to be visible on Business Map page 
    submissionCount: number,
    video: string,
    // question posed by business
    question: string,
    // student answers alongside their information
    answers: [
      {
        name: string,
        email: string,
        content: string,
      }
    ],
    // availability of the business for meetings
    meeting: {
      method: string,
      date: string,
      time: string,
    },
    meetUpResponses: {
      // student wants to meet and can make the time
      yes: [
        {
          name: string,
          email: string,
        }
      ],
      // student is interested but not available at those times
      timeConflict: [
        {
          name: string,
          email: string,
        }
      ],
    },
  },
};
