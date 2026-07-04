import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Plus, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Department } from "@/features/department/types/department.types";
import { useModal } from "@/hooks/modal/useModal";
import { useState } from "react";
import { AssignDepartmentFormModel } from "../models/assign-department-form-model";

type DepartmentCardProps = {
  staffId: string;
  departments: Department[];
}

export function DepartmentCard({ 
  staffId,
  departments
}: DepartmentCardProps) {
  
  const { isOpen, openModal } = useModal("assign-department-form");
  const [selectedDepartment, setSelectedDepartment] = useState<Department[] | null>(null);
  
  return (
    <>
    <Card className="bg-card text-card-foreground flex flex-col gap-3 rounded-xl border py-4 relative">
                <CardHeader className="flex flex-row items-center justify-between px-6">
                  <CardTitle>Departments</CardTitle>
                  <>
                    {departments && departments.length > 0 ? (
                      <Button 
                        className="gap-3" 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedDepartment(departments)
                          openModal()
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </Button>
                    ): (
                      <Button 
                        className="gap-3" 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedDepartment(null)
                          openModal()
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
                    <div className="space-y-4 lg:space-y-8">
                      <>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-sm">
                            <Briefcase className="text-muted-foreground h-4 w-4"/>
                            {departments && departments.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {departments.map((dept) => (
                                  <Badge className="rounded-md" key={dept.id}>{dept.name}</Badge>
                                ))}
                              </div>
                            ) : (
                              <span>No department</span>
                            )}
                            
                          </div>
                        </div>
                      </>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {isOpen &&  (
                        <AssignDepartmentFormModel  
                          staffId={staffId}
                          defaultValues={selectedDepartment || undefined}
                        />
                            )}
              </>
  )
}