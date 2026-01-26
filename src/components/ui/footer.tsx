import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-earthy text-white py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl">🐕</div>
              <span className="text-xl font-bold">DogWalking</span>
            </div>
            <p className="text-white/70 text-sm mb-4">
              La plateforme #1 en France pour les promenades de chiens. 
              Promeneurs vérifiés, paiement sécurisé, preuves obligatoires.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nos Services */}
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Nos Services</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/services/promenade" className="hover:text-white transition-colors">Promenade de chien</a></li>
              <li><a href="/services/garde" className="hover:text-white transition-colors">Garde de chien</a></li>
              <li><a href="/services/visite" className="hover:text-white transition-colors">Visite à domicile</a></li>
              <li><a href="/tarifs" className="hover:text-white transition-colors">Nos tarifs</a></li>
              <li><a href="/nos-zones" className="hover:text-white transition-colors">Nos zones</a></li>
            </ul>
          </div>

          {/* Propriétaires */}
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Propriétaires</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/find-walkers" className="hover:text-white transition-colors">Trouver un promeneur</a></li>
              <li><a href="/nos-zones" className="hover:text-white transition-colors">Zones d'intervention</a></li>
              <li><a href="/referral" className="hover:text-white transition-colors">Parrainage</a></li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Ressources</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/qui-sommes-nous" className="hover:text-white transition-colors">Qui sommes-nous</a></li>
              <li><a href="/aide" className="hover:text-white transition-colors">Centre d'aide</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/walker/register" className="hover:text-white transition-colors">Devenir promeneur</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@dogwalking.fr" className="hover:text-white transition-colors">contact@dogwalking.fr</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>01 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/50 gap-4">
            <p>© 2024 DogWalking. Tous droits réservés.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="/cgu" className="hover:text-white transition-colors">CGU/CGV</a>
              <a href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};