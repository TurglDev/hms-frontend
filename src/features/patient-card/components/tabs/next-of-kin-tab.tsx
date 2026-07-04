import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { useNextOfKin } from "@/features/next-of-kin/hooks/useNextOfKin";
import { useModal } from "@/hooks/modal/useModal";
import { useState } from "react";
import type { NextOfKin } from "@/features/next-of-kin/types/next-of-kin.types";
import { NextOfKinFormModel } from "../models/next-of-kin-form-model";

type NextOfKinTabProps = {
  patientCardId: string;
  nextOfKinId: string;
}

export function NextOfKinTab({ 
  patientCardId,  
  nextOfKinId
}: NextOfKinTabProps) {

  const { isOpen, openModal } = useModal("next-of-kin-form");
  const { nextOfKin } = useNextOfKin(nextOfKinId);  
  const [selectedNextOfKin, setSelectedNextOfKin] = useState<NextOfKin | null>(null);

  return (
    <Card className="bg-card text-card-foreground flex flex-col gap-3 rounded-xl border py-4 relative">
      <CardHeader className="flex flex-row items-center justify-between px-6">
        <CardTitle>Next of Kin</CardTitle>
        <>
          {nextOfKin ? (
            <Button 
              className="gap-3" 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setSelectedNextOfKin(nextOfKin);
                openModal();
              }}
              >
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          ) : (
            <Button
              className="gap-3" 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setSelectedNextOfKin(null);
                openModal();
              }}
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          )}
        </>
      </CardHeader>

      <CardContent className="px-6">
        <div className="space-y-12">
          {nextOfKin ? (
            <div className="space-y-4 lg:space-y-8">
              <p className="text-muted-foreground mb-3 text-xs font-medium uppercase">
                Emergency Contact Information
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground uppercase">Full Name:</span>
                  <span>{nextOfKin.fullName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground uppercase">Relationship:</span>
                  <span>{nextOfKin.relationship}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground uppercase">Phone Number:</span>
                  <span>{nextOfKin.phoneNumber}</span>
                </div>
              </div>
            </div>
          ) : (
            <p>No Emergency Contact Information</p>
          )}
        </div>
        {isOpen &&  (
          <NextOfKinFormModel  
            patientCardId={patientCardId}
            defaultValues={selectedNextOfKin || undefined}
          />
        )}
      </CardContent>
    </Card>
  );
};
