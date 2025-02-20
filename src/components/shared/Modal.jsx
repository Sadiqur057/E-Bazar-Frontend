import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "sm",
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`w-[90%] ${
          size === "sm" ? "max-w-[475px]" : size === "xl" ? "max-w-[1100px]" : "max-w-[800px]"
        }`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="mt-4 max-h-[70vh] overflow-auto custom-scrollbar">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
