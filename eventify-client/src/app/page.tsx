import { Event, Events } from "@/components/Events";
import { Header } from "@/components/Header";
import { api } from "@/services/api";
import { isAuthenticated } from "@/utils/isAuthenticated";
import {cookies} from "next/headers";
import { redirect, useRouter } from "next/navigation";
export type Tag = {
  id: string;
  name: string;
  backgroundColor: string;
}
export default async function Home() {
	// if(!isAuthenticated()) {
	// 	return redirect("/login");
	// }
	const events = await api.get<Event[]>("events");
	const tags =  await api.get<Tag[]>("tags");
  
	const EventsWithTags = events.data.map((event) => {
		const eventTagsId = event.tags.split(",");
		event.tags = [];
		for(const tag of tags.data) {
			if (eventTagsId.includes(tag.id)) {
				event.tags.push(tag);
			}
		}
		return event;
	});

	return (
		<>
			<Header />
	
			<Events events={EventsWithTags}/>
		</>
	);
}
