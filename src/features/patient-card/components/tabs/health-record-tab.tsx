import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

type HealthRecordTabProps = {
  patientCardId: string;
  patientId: string;
}

export function HealthRecordTab({ 
  patientCardId,  
  patientId
}: HealthRecordTabProps) {

	console.log(patientCardId);
	console.log( patientId)


  return (
    <Card className="bg-card text-card-foreground flex flex-col gap-3 rounded-xl border py-4 relative">
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <CardTitle>Health Records</CardTitle>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							className="gap-3"
						 	variant="outline"
						> 
						 	<Plus className="w-4 h-4" />
							Create EHR
						</Button>
					</SheetTrigger>
					 
				</Sheet>
      </CardHeader>

      <CardContent className="px-6">
        <div className="space-y-12">
          
        </div>
        
      </CardContent>
    </Card>
  );
};
