import {useState, useEffect} from 'react';
import Modal from '~/components/Modal';
import Cookies from 'js-cookie';

export default function CommentSection({productTitle, productId}) {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const cookiesComments = getCommentcookies(productId);
    setComments(cookiesComments);
  }, [productId]);

  function getCommentcookies(productId) {
    const cookiesComments = JSON.parse(Cookies.get('comments') ?? '[]').filter(
      (c) => JSON.stringify(c.idProduct) == JSON.stringify(productId),
    );
    return cookiesComments;
  }

  function setCommentcookies(newComment) {
    let cookiesComments = JSON.parse(Cookies.get('comments') ?? '[]');
    cookiesComments.push(newComment);
    Cookies.set('comments', JSON.stringify(cookiesComments), {
      expires: 7,
      sameSite: 'strict',
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commentInput.trim() === '') return;

    const newComment = {
      id: Date.now(),
      product: productTitle,
      text: commentInput,
      idProduct: productId,
    };

    setComments([...comments, newComment]);
    setCommentcookies(newComment);
    setCommentInput('');
    setIsModalOpen(true);
  };

  return (
    <section className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Laisser un commentaire</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2 font-medium">
          Produit : {productTitle}
        </label>
        <label className="block mb-2 font-medium">
          Commentaire :
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            rows="4"
            className="w-full border rounded p-2 mt-1"
            placeholder="Écrivez votre commentaire ici..."
          ></textarea>
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Envoyer
        </button>
      </form>
      <div>
        <h3 className="text-lg font-semibold mb-2">Commentaires :</h3>
        {comments.length === 0 ? (
          <p>Aucun commentaire pour le moment.</p>
        ) : (
          <ul className="space-y-2">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="p-2 bg-white border rounded shadow-sm"
              >
                <strong>{comment.product} :</strong>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isModalOpen && (
        <Modal
          title="Merci pour votre commentaire !"
          message="Nous apprécions votre opinion et elle a bien été enregistrée."
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
