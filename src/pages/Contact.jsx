import ContactCards from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import GoogleMap from '../components/GoogleMap';

export default function Contact() {
  return (
    <div className="bg-sky-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center py-6">Contact Us</h1>
      <ContactCards />
      <ContactForm />
      <GoogleMap />
    </div>
  );
}
