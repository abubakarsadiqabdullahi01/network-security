import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { VisuallyHidden } from "@/components/ui/visually-hidden"
  
  export function ExampleDialog() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>Dialog Title</DialogTitle>
            </VisuallyHidden>
            <DialogDescription>
              This is a dialog description. The title is hidden visually but available to screen readers.
            </DialogDescription>
          </DialogHeader>
          {/* Dialog content goes here */}
        </DialogContent>
      </Dialog>
    )
  }
  
  