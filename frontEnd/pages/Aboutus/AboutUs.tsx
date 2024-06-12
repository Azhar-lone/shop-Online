import React, { useEffect, useState } from "react"

import { ArrowBigUp } from "lucide-react"

//components 
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"

// custom Compoents
import Container from "@/components/myUi/Container"
// api's
import { getAboutUsInfo } from "../../api's/aboutUs"

// importing aboutUs
import "./blog.css"
// import Static Data
import { staticOurTeam } from "../../StaticData/aboutus"

interface ourTeamType {
    picture?: string,
    name: string,
    role: string,
    links: string[],
    discription: string
}

export default function AboutUs() {


    document.title = "About us"

    let [aboutus, setAboutus] = useState<string>("<h3>Something<h3/>")
    let [ourTeam, SetOurTeam] = useState<ourTeamType[]>(staticOurTeam)

    useEffect(() => {
        getAboutUsInfo().then((res) => {
            if (res !== 1) {
                // setAboutus(res)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])




    return (
        <Container
            className="flex flex-col p-5"
        >
            <div className="blog">

                <h1>Static For Now</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui error ullam necessitatibus, harum, beatae temporibus magni dicta illum minus dolores voluptates repellendus et quasi repellat officiis rerum asperiores unde! Tempora rem nobis porro nesciunt repudiandae rerum quidem alias sed veritatis ab ex, velit laboriosam error reprehenderit reiciendis optio sit maxime! Similique, esse? Architecto natus illo fuga, sunt unde illum consectetur consequuntur velit error, dicta, explicabo soluta blanditiis labore nesciunt. Consequuntur, culpa ut repellat modi totam, ipsum explicabo fugiat unde est corrupti aliquid iusto ullam, exercitationem voluptate alias mollitia veniam? Doloribus earum cum minus quas consequatur, ab, nemo numquam tempora quasi enim suscipit. Sed cum ab, doloremque fuga eum libero odit! Consequatur quisquam minima eius veniam? Harum in sit placeat consequatur dicta fugit, quod quibusdam quidem nemo quasi pariatur, provident adipisci maxime reiciendis, voluptate voluptatibus est! Consequatur vero modi, cumque, cum placeat rem ex magni adipisci voluptatum dolorem quibusdam perspiciatis harum fuga at odit dolores, optio pariatur reiciendis fugit minus? Quo aut eligendi eum error modi rerum beatae quas necessitatibus sint eveniet? Quas, praesentium doloribus quae adipisci nemo qui assumenda enim minima nesciunt sequi culpa voluptatem! Iusto iure saepe sed cumque dolore eaque sunt aliquid magnam consequuntur quod qui id tenetur minus dignissimos laudantium fugit esse alias aperiam autem hic molestias, nemo doloremque voluptates necessitatibus. Officia quia animi odio debitis quidem, harum, voluptatibus, repellendus sequi voluptate veniam illum libero eaque explicabo repellat iusto vel laudantium? Explicabo atque maiores fugit, rerum nesciunt earum odit natus? Obcaecati quod soluta ab id explicabo iure itaque, dolor officia atque eaque tempora veritatis doloribus, rem fugiat impedit quisquam quaerat voluptate natus? Quod doloremque distinctio aliquid neque cum animi consequuntur cupiditate, officia ex, libero aspernatur necessitatibus fuga. Odio assumenda accusamus exercitationem vel minus autem corrupti vero enim reprehenderit, consequatur veritatis repellat sint, id dolores aliquid perferendis distinctio alias nisi. Perspiciatis sint nemo facere dignissimos! Deserunt unde nisi minima, cupiditate eaque molestiae magnam excepturi rem iusto rerum modi ex neque quam perferendis quisquam hic! Assumenda quidem illum, quisquam nulla quae dolorum eaque. Dolorum ipsa doloribus nisi magni quasi repellat eos quia, veniam laborum velit nobis ex vel eum, corrupti iusto sed deserunt similique, ipsam in? Odit iste, nemo nobis dolor omnis aliquid quod et repudiandae esse officiis. Rerum necessitatibus quibusdam vel! Quidem animi officia ea, enim, reiciendis neque repellendus omnis consequatur necessitatibus voluptate fugiat minima dolore corrupti commodi eaque cum soluta placeat sed accusamus vero? Fugit nihil at provident, maiores earum cumque nam quisquam dignissimos vero quia quis excepturi mollitia voluptate voluptatibus veniam, ratione qui tenetur enim. Rerum quas tempora praesentium porro totam placeat aperiam molestiae earum illo quaerat odit, sunt ex iste suscipit quam, quo tenetur magni, necessitatibus eius soluta animi recusandae! Iste eaque cupiditate repudiandae facilis. Repellat sint nihil nostrum nobis odio vero dolore, quos amet ipsam praesentium? Eaque ducimus distinctio libero, neque voluptatum ea aliquam totam exercitationem quo harum sed, nostrum reiciendis obcaecati labore, quas amet quibusdam. Ducimus natus beatae adipisci aspernatur corporis quia rerum officiis cum. Perspiciatis nesciunt quam minus veniam, deserunt voluptatibus incidunt consequatur! Accusantium ab eos temporibus officiis placeat iure minus quos tempora maiores repudiandae hic sed pariatur, natus est voluptatum quam iste provident eaque praesentium ducimus? Cupiditate quae quas commodi blanditiis, natus placeat molestias ad! Beatae labore eius sapiente laudantium eligendi, odit vel, itaque delectus temporibus neque earum provident ut ad consequuntur corporis mollitia nam distinctio eaque animi exercitationem quo, veritatis veniam sit dignissimos. Magnam nam accusantium accusamus aspernatur magni asperiores temporibus? Fugiat ipsam adipisci repellendus! Eveniet saepe ex vel quam! Eveniet ipsam quae voluptatum. Natus aperiam, ea perferendis assumenda nostrum itaque sequi fuga magni. Tempore distinctio voluptatum voluptatem id quibusdam at suscipit unde odit explicabo, dignissimos facilis maiores quasi corrupti saepe commodi optio deserunt totam corporis voluptas exercitationem eius necessitatibus! Nisi nemo quos debitis eum quia, deleniti ipsam asperiores, culpa quae consequatur iure, in odit nulla veritatis eaque dignissimos molestiae rerum dolorum. Officia quasi soluta incidunt tempora illo facilis ea optio non, neque autem, maxime odio officiis laboriosam nesciunt assumenda voluptate doloribus! Ratione ipsam voluptatum repudiandae ipsa, id hic velit libero dicta quod soluta dolor ad, placeat, eligendi ullam? Totam expedita, magni animi minima, iusto ipsam officiis neque quidem voluptas hic est dolorem quaerat asperiores culpa rem temporibus soluta maxime nam architecto consectetur? Quasi eum nemo perferendis maiores praesentium architecto vero, nulla saepe soluta, ut incidunt suscipit mollitia est, hic error? Reiciendis officiis nam illum saepe quisquam explicabo, repellendus labore voluptatum praesentium tenetur tempora velit. Nemo quaerat eum officia dolorem error voluptas, voluptatum, deleniti assumenda eius quisquam sunt ab. Numquam exercitationem voluptatem placeat quibusdam labore voluptatum eum, vel architecto iure officia iusto odio distinctio maiores reiciendis neque dolore, quis ipsum hic adipisci velit fuga doloremque. Ullam culpa modi ratione, temporibus tempore atque sit hic commodi exercitationem, doloremque perferendis. Sunt nulla deserunt explicabo. Vel atque vero unde! Quod neque amet reprehenderit nam perferendis, cum et expedita explicabo dolor vitae dolores consequatur corporis ipsum alias consequuntur, eius dolore animi, dolorum blanditiis adipisci modi iusto ducimus. Ea ullam hic possimus obcaecati omnis consectetur est perspiciatis consequuntur unde id nemo odit ut repudiandae fuga recusandae necessitatibus excepturi in nulla, praesentium, animi quibusdam accusantium dolor earum! Laboriosam dolorum id saepe neque provident laudantium repellendus ab amet ullam doloribus, voluptatem dolorem et rerum nemo architecto mollitia fugit non, sit tempore ducimus, similique minus modi molestias accusamus. Necessitatibus quisquam perspiciatis nisi recusandae reiciendis ipsam quia atque facilis nesciunt architecto at esse in itaque quos ut ipsum delectus, officiis accusantium, fuga amet modi quaerat! Aspernatur optio ea commodi quos? Harum inventore praesentium similique officia illo architecto sed a fuga ea perferendis commodi iure quibusdam magni explicabo, quam expedita fugit sequi sint et at aut quo aliquid! Consectetur ullam quo maiores ea cupiditate, doloribus cum iste natus, quos exercitationem velit tempore aperiam culpa quia? Quasi quidem natus doloremque ipsa, eveniet aliquid voluptatum quisquam harum ex numquam, rem nobis dignissimos reiciendis error architecto sunt mollitia vero optio? Quae aliquam consequatur similique quas officiis ex sit eos, unde mollitia quos, veniam quasi distinctio repudiandae voluptate modi facere, quam nihil assumenda soluta.</p>
                <img src="/StaticData/imgs/Hitesh.png" alt="" />
                <h2>Heading 2</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia aut, obcaecati nesciunt natus amet mollitia itaque voluptatum laudantium quod placeat sed eos assumenda culpa quia, at nam aspernatur quisquam quibusdam tempora non sint cupiditate voluptatibus! Commodi magni officiis molestiae ad a expedita eum aut distinctio excepturi blanditiis unde facere ea pariatur neque animi tempora iure sunt autem velit, doloribus voluptate quis numquam at error! Aliquid ab quos fuga laborum sit rerum temporibus fugiat ducimus voluptatum minima ad illum placeat atque optio nesciunt ipsa, pariatur cupiditate? Asperiores corporis ab quos iure eos sapiente maxime debitis quod, officiis accusantium, dolor deserunt tenetur!</p>
                <h5>Heading 5</h5>
                <p>Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Eaque, fuga itaque blanditiis architecto at delectus quod sunt quo enim quis incidunt provident sit quam quos minima illo ullam ipsam, eum sed officia unde dignissimos rerum. Asperiores, qui. Accusantium, ut facere. Ist
                    <img src="/StaticData/imgs/Hitesh.png" alt="" />
                    e incidunt rerum maiores ex nisi iusto magnam enim tempora, error repellendus quo officia dignissimos. Atque sed, nihil earum veniam temporibus veritatis id unde quasi nemo quam eos placeat obcaecati laboriosam excepturi ea explicabo quibusdam consectetur aspernatur autem. Molestias magni recusandae voluptatum et deserunt necessitatibus temporibus corporis in maiores cumque libero maxime, eligendi harum aliquam tempora veritatis consequuntur, laboriosam quidem rem repellendus soluta! Sequi iste excepturi molestiae quisquam minima itaque sit, incidunt, quibusdam dolore nemo, explicabo ipsum doloribus tempora debitis natus? Doloremque porro dolor saepe similique amet suscipit non consequatur asperiores deleniti accusamus vitae tenetur nisi, laboriosam ex reprehenderit exercitationem rem nihil provident consectetur. Iure vitae at, id aspernatur praesentium, provident amet cumque minima nam quod laboriosam. Earum repudiandae mollitia modi natus amet provident minima eveniet ipsam reprehenderit? Alias deserunt, obcaecati similique vel nostrum exercitationem recusandae provident quas ducimus sed molestias modi, voluptates quae optio perferendis nisi minima fuga. Voluptatum veniam ullam sequi nemo explicabo soluta quibusdam at velit corporis. Autem totam, facere repellendus fugiat dicta ad in facilis. Earum dolorum vel eligendi esse enim quam veritatis laudantium reprehenderit fugiat. Quasi nostrum, nisi molestiae illum itaque natus et molestias est error ipsa fuga debitis excepturi quisquam placeat doloribus tempora, ad ea soluta tempore, commodi dolores veniam laborum culpa cum. Reiciendis earum omnis nostrum repudiandae quis quas, odio minus non quae distinctio porro, labore ipsam velit quo. Nulla rerum aliquam sit architecto atque? Maiores aliquid eos voluptatem, incidunt necessitatibus quaerat beatae quasi placeat similique dolorem ullam a officia sint modi amet molestiae? Tempore velit distinctio mollitia ullam eum laudantium assumenda cumque laboriosam nesciunt eius aliquid nihil error nemo dolor quis ad illum repellendus magnam dicta, similique rem! Odio, in nisi! Porro unde autem dolores error voluptates laborum, necessitatibus ipsam. Et consequatur perspiciatis quis beatae adipisci voluptatibus vitae, eos quae eligendi maiores, ratione repellendus atque sunt nisi nostrum nulla explicabo at distinctio dignissimos velit quaerat quas! Facilis minima ipsum repellendus aspernatur consectetur expedita natus excepturi quibusdam architecto sapiente labore voluptates, dolor ipsam exercitationem nemo beatae molestias obcaecati iste sint adipisci libero quisquam nobis. Unde corrupti dolores excepturi voluptatem nostrum rem modi autem consectetur, expedita reprehenderit repudiandae ab ea repellendus natus velit dolore.</p>
            </div>
            <>
                <h3 className="border-b-4 p-3 w-[50%] mx-auto text-4xl font-extrabold">OurTeam</h3>


                <div className="flex flex-wrap gap-4  p-2 ">

                    {
                        ourTeam.map((element, i) => (
                            <div className=" flex flex-col items-center text-center bg-background sm:w-[48%] shadow-2xl  lg:w-[23%] xl:w-[24%] h-96 rounded-2xl border hover:scale-105   duration-75" key={i}>
                                {/* <img src={element.memberPic} className="  w-[0%] h-[40%] rounded-full" alt="Image" /> */}
                                <Avatar
                                    className="size-36 "
                                >
                                    <AvatarFallback>{element.name.charAt(0)}</AvatarFallback>
                                    <AvatarImage
                                        src={element.picture}
                                    />
                                </Avatar>
                                <h1 className="text-xl p-1 border-b-2">{element.name}</h1>
                                <h1 className="text-2xl p-1  " >{element.role}</h1>
                                <p className="h-36 overflow-auto text-light">{element.discription}</p>
                                <ArrowBigUp className="left-10 text-red-600 relative p-3 size-5" />
                            </div>
                        ))
                    }
                </div>
            </>
        </Container>
    )
}


