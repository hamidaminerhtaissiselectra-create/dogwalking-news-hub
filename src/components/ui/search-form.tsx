import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MapPin, Heart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SearchForm = () => {
  const navigate = useNavigate();
  const [animalType, setAnimalType] = useState("chien");
  const [selectedService, setSelectedService] = useState("");
  const [address, setAddress] = useState("");

  const servicesAbsent = [
    { id: "hebergement_nuit", label: "Hébergement", icon: Heart },
    { id: "garde_domicile", label: "Garde à domicile", icon: Heart },
  ];

  const servicesTravail = [
    { id: "visite_domicile", label: "Visites à domicile", icon: Heart },
    { id: "hebergement_jour", label: "Garderie pour chien", icon: Heart },
    { id: "promenade", label: "Promenade de chien", icon: Heart },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (address) params.set("location", address);
    if (selectedService) params.set("service", selectedService);
    navigate(`/find-walkers?${params.toString()}`);
  };

  return (
    <div className="bg-card shadow-card rounded-2xl p-6 md:p-8 max-w-xl mx-auto border border-border">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Je cherche un service pour mon :
      </h2>

      {/* Type d'animal */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Type d'animal</Label>
        <RadioGroup 
          value={animalType} 
          onValueChange={setAnimalType}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="chien" id="chien" className="border-primary text-primary" />
            <Label htmlFor="chien" className="flex items-center gap-2 cursor-pointer text-base">
              <span className="text-xl">🐕</span> Chien
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="chat" id="chat" className="border-primary text-primary" />
            <Label htmlFor="chat" className="flex items-center gap-2 cursor-pointer text-base">
              <span className="text-xl">🐱</span> Chat
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Services quand absent */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Quand vous êtes absent</Label>
        <RadioGroup 
          value={selectedService} 
          onValueChange={setSelectedService}
          className="space-y-3"
        >
          {servicesAbsent.map((service) => (
            <div 
              key={service.id}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedService === service.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <RadioGroupItem value={service.id} id={service.id} className="border-primary" />
              <Heart className="h-5 w-5 text-heart fill-heart-light" />
              <Label htmlFor={service.id} className="cursor-pointer flex-1 text-base font-medium">
                {service.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Services quand au travail */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Quand vous êtes au travail</Label>
        <RadioGroup 
          value={selectedService} 
          onValueChange={setSelectedService}
          className="space-y-3"
        >
          {servicesTravail.map((service) => (
            <div 
              key={service.id}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedService === service.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <RadioGroupItem value={service.id} id={service.id} className="border-primary" />
              <Heart className="h-5 w-5 text-heart fill-heart-light" />
              <Label htmlFor={service.id} className="cursor-pointer flex-1 text-base font-medium">
                {service.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Adresse */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Adresse</Label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
          <Input 
            type="text" 
            placeholder="Ajoutez votre adresse ou ville" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="pl-12 h-14 text-base rounded-xl border-2"
          />
        </div>
      </div>

      {/* Bouton rechercher */}
      <Button 
        className="w-full h-14 text-lg font-semibold rounded-xl"
        onClick={handleSearch}
      >
        <Search className="h-5 w-5 mr-2" />
        Rechercher un promeneur
      </Button>
    </div>
  );
};
