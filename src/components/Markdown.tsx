import ReactMarkdown, { type Components } from 'react-markdown'
import { Link } from 'react-router'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import './Markdown.css'

const components: Components = {
  // Internal links go through the router; external ones open in a new tab.
  a({ href = '', children, title }) {
    if (href.startsWith('/')) return <Link to={href} title={title}>{children}</Link>
    const external = /^https?:\/\//.test(href)
    return (
      <a href={href} title={title} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {children}
      </a>
    )
  },
  img({ src, alt, title }) {
    return <img src={src} alt={alt ?? ''} title={title} loading="lazy" />
  },
}

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeHighlight, { detect: false }]]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
