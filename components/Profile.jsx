import PartyCard from "./PartyCard";
import Link from 'next/link';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='profile_section'>
      <h1>
        <span>{name}</span> Profile
      </h1>
      <div className='container'>
        <p className='subheading'>{desc}</p>
        <div className='profile_parties'>
          <Link
            href='/create-party'
            className='profile_create_party'
          >
            Create Party
          </Link>
          {data.map((post) => (
            <PartyCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
