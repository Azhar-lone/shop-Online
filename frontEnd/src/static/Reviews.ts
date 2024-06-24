import reviewType from "@/types/Review";

export let reviews: reviewType[] = [
    {
        date: new Date(),
        owner: {
            name: "Azhar Lone",
            profilePic: "",
            userName: "azhar-lone"
        },
        review: "Good One ",
        rating: 5

    },
    {
        date: new Date(),
        owner: {
            name: "Azhar Lone 1",
            profilePic: "",
            userName: "azhar-lone1"
        },
        review: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione cum eos ipsam hic, in odit repellendus incidunt ducimus officiis vitae quia, necessitatibus deserunt! Ipsam atque aliquam laborum necessitatibus iusto dolorem quidem qui officiis doloribus, ex laudantium! Vel iure at voluptate corrupti cumque delectus qui excepturi odio asperiores deserunt. Vitae sequi veritatis repudiandae cum molestias beatae eius a non est, ab facilis nisi temporibus sapiente? Molestiae, consequatur recusandae, porro sunt excepturi quasi similique reiciendis nemo tempore distinctio iure. Iste eius dolorem exercitationem tempora, modi quae, quas dignissimos quasi harum assumenda atque. Consequatur perspiciatis, rerum velit ullam dolorem magnam ipsa fuga atque!
        `,
        rating: 5

    }
]