import ReflectionForm from '@/components/ReflectionForm';

export default function ReflectionPage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto fade-in">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-[#0f172a]">
              Reflexão sobre o aprendizado
            </h1>
            <p className="text-lg text-[#64748b]">
              Registre seus pensamentos, insights e perguntas sobre o que você
              estudou
            </p>
          </div>

          {/* Form */}
          <ReflectionForm />
        </div>
      </div>
    </div>
  );
}

