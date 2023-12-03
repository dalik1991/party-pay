import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='form_section'>
      <h1>
        {type} <span>Party</span>
      </h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          value={post.party}
          onChange={(e) => setPost({ ...post, party: e.target.value })}
          placeholder='Write party name here'
          required
        />
        <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          type='text'
          placeholder='#Tag'
          required
        />

        <div className='form_buttons'>
          <Link href='/profile' className='form_cancel'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='form_submit'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
