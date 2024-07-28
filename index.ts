// Record,
// Satisfies,
// Partial

// Partial
type Users = "mohamed" | "ahmed";

const userOne = {
  //   ahmed: 1,
  mohamed: "mohamed",
} satisfies Partial<Record<Users, number | string>>; 

console.log(userOne.mohamed.toUpperCase());

// type Member = {
//    memberName:string|null,
//    Pr:string
// }

// const firstMember = {
//    memberName:"Mohamed",
//    Pr:"Admin",
// } satisfies Member

// console.log(firstMember.memberName.toUpperCase())
// firstMember.memberName.toUpperCase()

// Replace namespace with a module
const name = "toyota";
export function getName() {
  return name;
}

