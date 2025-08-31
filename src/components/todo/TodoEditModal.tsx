import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TodoEditModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  editTitle: string;
  setEditTitle: (title: string) => void;
  editDescription: string;
  setEditDescription: (description: string) => void;
  saveEdit: () => void;
  closeEditModal: () => void;
}

export default function TodoEditModal({ 
  isEditModalOpen, 
  setIsEditModalOpen, 
  editTitle, 
  setEditTitle, 
  editDescription, 
  setEditDescription, 
  saveEdit, 
  closeEditModal 
}: TodoEditModalProps) {
  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <Input 
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  saveEdit();
                }
              }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Input 
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="(optional)"
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  saveEdit();
                }
              }}
            />
          </div>
          
          {/* 保存・キャンセルボタン */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={closeEditModal}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={saveEdit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}