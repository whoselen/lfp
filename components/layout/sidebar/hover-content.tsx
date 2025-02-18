import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCardContent } from "@/components/ui/hover-card";

type ListItemHoverContentType = {
  imageSrc: string;
  name: string | null;
  description?: string | null;
};

const ListItemHoverContent: React.FC<ListItemHoverContentType> = ({
  imageSrc,
  name,
  description,
}) => {
  return (
    <HoverCardContent>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 flex-shrink-0 border-2 border-border">
            <AvatarImage
              src={imageSrc}
              alt={`${name} logo`}
              className="object-cover"
            />
            <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="space-y-0.5">
            <p className="text-sm font-medium">{name}</p>
            {/* <p className="text-xs text-muted-foreground">@k.kennedy</p> */}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-border bg-background py-0.5 p-1 shadow shadow-black/5">
            <div className="flex -space-x-3">
              <Avatar className="h-8 w-8 flex-shrink-0  ring-2 ring-background">
                <AvatarImage
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNk32E4jgtolJEPLa9gqCp9L6ntJ43pe6Ht_frx4VvsoXvVuSbELspHvRMgKJn_cTVS-c&usqp=CAU"
                  alt={`${name} logo`}
                  className="object-cover ring-2 ring-background"
                />
                <AvatarFallback>
                  {name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 flex-shrink-0  ring-2 ring-background">
                <AvatarImage
                  src="https://64.media.tumblr.com/2270ba80fd0f77927ed24b4d7434b711/tumblr_pn9akhxmnw1wwk25o_640.jpg"
                  alt={`${name} logo`}
                  className="object-cover ring-2 ring-background"
                />
                <AvatarFallback>
                  {name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 flex-shrink-0  ring-2 ring-background">
                <AvatarImage
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO4kIs40dfp7wkVoXAMOZe4QkkzoKU_vjkaA&s"
                  alt={`${name} asdasasd`}
                  className="object-cover ring-2 ring-background"
                />
                <AvatarFallback>
                  {name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <Button
              variant="secondary"
              className="z-10 flex items-center justify-center rounded-full bg-transparent px-3 text-xs text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground"
            >
              +3 users active now
            </Button>
          </div>
        </div>
      </div>
    </HoverCardContent>
  );
};

export default ListItemHoverContent;
