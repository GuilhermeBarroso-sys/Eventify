import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import defaultImage from "../../assets/defaultImageEvent.jpg";
import { Tag } from "@/app/page";
import { Badge } from "../ui/badge";
export type Event = {
  id: string,
  name: string,
  description: string,
  owner_id:  string,
  tags: Array<Tag>,
  price: number,
  amount: number,
  is_blocked: boolean,
  event_date: string,
  image_url: null,
  created_at: string,
  updated_at: string,
}
interface IEventsProps {
  events: Event[]
}
export function Events({events} : IEventsProps) {
	return (
		<ScrollArea className=" rounded-md border w-[95%] mx-auto">
    
			<div className="flex w-max space-x-4 pb-4 justify-center">
				{events.map((event) => (
					<div key = {event.id} className="max-w-[350px]">
						<div  className="overflow-hidden rounded-md mb-4">
							<Image
								src={event.image_url ?? defaultImage}
								alt={event.name}
								width={200}
								height={200}
								className={
									"h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]" }
							/>
						</div><div className="space-y-1 text-sm max-w-[250px]">
							<h3 className="font-medium leading-none">{event.name}</h3>
							<p className="text-xs text-muted-foreground">{event.description}</p>
							<div className="flex gap-2 flex-wrap">
								{event.tags.map((tag) => (
									<Badge key = {tag.id} style={{
										backgroundColor: tag.backgroundColor
									}}>{tag.name}</Badge>
									// <p key={tag.id}className="text-xs text-muted-foreground">{event.name}</p>
								))}
							</div>

						</div>
					</div>
				))}
			</div>
			<ScrollBar orientation="horizontal" />

		</ScrollArea>
	);
}