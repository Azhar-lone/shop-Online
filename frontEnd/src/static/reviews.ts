import reviewType from "@/types/Review";

export let reviews: reviewType[] = [
  {
    rating: 4,
    review: "Revidw sdgdsg ssdklnglkdsg gdksngkdsg",
    reviewBy: {
      firstName: "Azhar",
      lastName: " Lone",
      profilePic: "",
      userName: "azhar-lone",
      _id: "1",
    },
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    rating: 5,
    review: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ducimus officia fugit deserunt qui, odit, minus nihil molestiae alias quae odio? Excepturi expedita voluptatum eius quidem tenetur ab dignissimos et consectetur eligendi voluptates eveniet harum molestias vel dicta, velit alias, ea nobis cumque labore dolor voluptatibus error, rem omnis facilis! Voluptas officia adipisci possimus debitis? Aliquam repellat nobis autem fuga quam quisquam, iure, delectus nisi quod molestias odio exercitationem ratione! Laudantium libero est fugiat quod praesentium maiores, expedita alias voluptates minima ad modi nam architecto ducimus quibusdam sapiente corrupti quisquam cumque, porro repellendus perferendis ullam reiciendis eum sed iusto! Sed.
    `,
    reviewBy: {
      firstName: "Some",
      lastName: " One",
      profilePic: "",
      userName: "Some-One",
      _id: "1",
    },
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];
