import styles from './PartyForm.module.scss'

import Link from "next/link";

const Form = ({ post, setPost, submitting, handleSubmit, apply }) => {
    return (
        <form
            onSubmit={handleSubmit}
            className={styles.form}
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

            <div className={styles.buttons}>
                <Link href='/profile' className={styles.cancel}>
                    Cancel
                </Link>

                <button
                    type='submit'
                    disabled={submitting}
                    className={styles.submit}
                >
                    {submitting ? `Loading...` : apply}
                </button>
            </div>
        </form>
    );
};

export default Form;
