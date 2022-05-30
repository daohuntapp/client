// import { moralisPortInstance } from ".";

// export const ipfsUpload = async (
//   metadata: Record<string, any>
// ): Promise<
//   | {
//       success: true;
//       path: string;
//     }
//   | {
//       error: string;
//       success: false;
//     }
// > => {
//   try {
//     const url = "/ipfs/uploadFolder";
//     const { data } = await moralisPortInstance.post(url, [
//       {
//         path: "instaNFT/metadata.json",
//         content: metadata,
//       },
//     ]);
//     return {
//       success: true,
//       path: (data as any)?.[0]?.path,
//     };
//   } catch (error: any) {
  
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// };
