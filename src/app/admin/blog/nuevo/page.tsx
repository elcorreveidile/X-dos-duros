import { BlogForm } from '../BlogForm'

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Nuevo artículo</h1>
        <p className="text-muted text-sm mt-1">Rellena los campos y pulsa "Crear artículo".</p>
      </div>
      <BlogForm />
    </div>
  )
}
