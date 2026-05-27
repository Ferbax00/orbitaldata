import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Satellite, Network, Shield, Wrench, ShoppingCart, MapPin, Mail, Phone, Award } from 'lucide-react';
import { submitContactForm } from '../services/api';
import { toast } from 'sonner';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactForm(formData);
      toast.success('Solicitud enviada exitosamente');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.message || 'Error al enviar la solicitud');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const businessLines = [
    {
      icon: Satellite,
      title: 'Telecomunicaciones (VSAT)',
      description: 'Conectividad y transmisión de datos por sistemas satelitales o terrestres; venta de capacidad de transmisión; instalación, puesta en marcha, mantenimiento y soporte de equipos VSAT y demás enlaces de comunicación.'
    },
    {
      icon: Network,
      title: 'Redes y seguridad',
      description: 'Planeación, diseño, suministro, instalación, configuración y soporte de LAN, WAN, VPN, cableado estructurado y fibra óptica; videovigilancia (CCTV) y control de acceso.'
    },
    {
      icon: Wrench,
      title: 'Mantenimiento técnico especializado',
      description: 'Mantenimientos preventivo, correctivo y predictivo; soporte técnico general y avanzado a servidores, equipos de cómputo, dispositivos de comunicación, hardware y software.'
    },
    {
      icon: ShoppingCart,
      title: 'Comercialización y suministro',
      description: 'Comercio al por mayor y menor; importación, exportación, distribución y venta de equipos de tecnología, informática y comunicaciones, hardware, software, licencias y materiales de instalación, en punto de venta o por plataformas electrónicas.'
    }
  ];

  const corporateProfile = [
    {
      title: 'Objeto social',
      description: 'Soluciones tecnológicas, de datos y de telecomunicaciones con enfoque integral: desde el diagnóstico y el diseño hasta la puesta en marcha y el soporte continuo.'
    },
    {
      title: 'Actividades autorizadas',
      description: 'Desarrollamos de forma integral VSAT y telecomunicaciones, redes y seguridad, mantenimiento especializado y comercialización y suministro, según las necesidades de cada proyecto.'
    },
    {
      title: 'Amplitud y proyección',
      description: 'Asumimos actividades lícitas conexas o complementarias a nuestro objeto cuando aportan valor al cliente. Compañía de duración indefinida, con capacidad de operación y presencia en Colombia y el exterior.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://ferbax00.github.io/orbitaldata/LOGO%201.png" 
                alt="OrbitalData Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-slate-900">ORBITALDATA</h1>
                <p className="text-xs text-slate-600">Soluciones Tecnológicas</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => scrollToSection('nosotros')} 
                className="text-slate-700 hover:text-cyan-600 transition-colors duration-200 font-medium"
              >
                Nuestra Identidad
              </button>
              <Button 
                onClick={() => scrollToSection('contacto')}
                className="bg-cyan-600 hover:bg-cyan-700 text-white transition-all duration-200"
              >
                Cotizar Proyecto
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-cyan-100 text-cyan-700 hover:bg-cyan-200 px-4 py-2 text-sm font-semibold">
            Innovación Tecnológica
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            ORBITALDATA
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Telecomunicaciones · Redes · Datos · Campo y Operación
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('nosotros')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-lg px-8 py-6 transition-all duration-200 hover:scale-105"
            >
              Conocer más
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => scrollToSection('contacto')}
              className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 text-lg px-8 py-6 transition-all duration-200 hover:scale-105"
            >
              Contactar
            </Button>
          </div>
        </div>
      </section>

      {/* Perfil Corporativo */}
      <section id="nosotros" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Perfil Corporativo</h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              <strong>ORBITALDATA S.A.S.</strong> es una sociedad comercial constituida bajo la Ley 1258 de 2008, 
              con domicilio principal en el <strong>Archipiélago de San Andrés, Providencia y Santa Catalina</strong>. 
              Nos dedicamos al <strong>desarrollo, comercialización, instalación y soporte integral</strong> de soluciones 
              <strong> tecnológicas, de datos y de telecomunicaciones</strong>, acompañando a nuestros clientes desde 
              la planificación hasta la operación en campo.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {corporateProfile.map((item, index) => (
              <Card 
                key={index} 
                className="border-2 border-slate-200 hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-cyan-700">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Líneas de Negocio */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Líneas de Negocio</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Servicios integrales de tecnología y telecomunicaciones adaptados a sus necesidades
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessLines.map((line, index) => {
              const Icon = line.icon;
              return (
                <Card 
                  key={index} 
                  className="border-2 border-slate-200 hover:border-cyan-500 transition-all duration-300 hover:shadow-xl group"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-600 transition-colors duration-300">
                      <Icon className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-lg text-slate-900">{line.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm leading-relaxed">{line.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Socios Tecnológicos */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Award className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Socios Tecnológicos</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Trabajamos con los mejores proveedores tecnológicos del mercado
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 max-w-4xl mx-auto">
            {/* Hikvision */}
            <div className="group transition-all duration-300 hover:scale-110">
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-cyan-500 hover:shadow-xl transition-all duration-300">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Hikvision_logo.svg/320px-Hikvision_logo.svg.png" 
                  alt="Hikvision Logo" 
                  className="h-16 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <p className="text-center mt-4 text-sm font-semibold text-slate-700">Soluciones de Videovigilancia</p>
            </div>
            
            {/* Syscom Colombia */}
            <div className="group transition-all duration-300 hover:scale-110">
              <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 hover:border-cyan-500 hover:shadow-xl transition-all duration-300">
                <img 
                  src="https://syscom.mx/images/logo_syscom.png" 
                  alt="Syscom Colombia Logo" 
                  className="h-16 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <p className="text-center mt-4 text-sm font-semibold text-slate-700">Distribuidor Tecnológico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Centro de Operaciones y Contacto */}
      <section id="contacto" className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Centro de Operaciones</h3>
            <p className="text-lg text-slate-600">Contáctenos para cotizar su proyecto</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Información de Contacto */}
            <div className="space-y-8">
              <Card className="border-2 border-cyan-200 bg-cyan-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-800">
                    <MapPin className="w-5 h-5" />
                    Sede Principal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">
                    Av 20 de Julio, Edificio Salgado, Apto 304<br />
                    San Andrés Isla, Colombia
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-cyan-200 bg-cyan-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-800">
                    <Mail className="w-5 h-5" />
                    Contacto Digital
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a 
                    href="mailto:josfer38@gmail.com" 
                    className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors duration-200"
                  >
                    josfer38@gmail.com
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Formulario de Contacto */}
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Solicitar Cotización</CardTitle>
                <CardDescription>Complete el formulario y nos pondremos en contacto</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Nombre / Razón Social
                    </label>
                    <Input 
                      id="name"
                      name="name"
                      type="text" 
                      placeholder="Su nombre o empresa"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Corporativo
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email" 
                      placeholder="correo@empresa.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Detalle del Requerimiento
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      placeholder="Describa su proyecto o requerimiento"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-6 text-lg transition-all duration-200 hover:scale-105"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">ORBITALDATA S.A.S.</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Soluciones tecnológicas, de datos y telecomunicaciones con presencia en Colombia y el exterior.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Telecomunicaciones VSAT</li>
                <li>Redes y Seguridad</li>
                <li>Mantenimiento Técnico</li>
                <li>Comercialización</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>San Andrés Isla, Colombia</li>
                <li>josfer38@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} ORBITALDATA S.A.S. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;