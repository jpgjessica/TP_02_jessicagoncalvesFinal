import {useState, useEffect} from 'react';
import Modal from '~/components/Modal';
import Cookies from 'js-cookie';
import Button from './Button';

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
    <section className="flex flex-col gap-2 items-center justify-center  ">
      <h2 className="text-2xl font-bold mb-4">
        Exprimez-vous, on est tout ouïe !
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl h-auto justify-center items-center gap-2 md:gap-12">
        <form onSubmit={handleSubmit} className="mb-4 ">
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

          <Button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 transition"
          >
            Envoyer
          </Button>
        </form>
        <div>
          <h3 className="text-lg font-semibold mb-2">Commentaires :</h3>
          {comments.length === 0 ? (
            <p>Aucun commentaire pour le moment.</p>
          ) : (
            <ul className="space-y-2">
              {comments.map((comment) => (
                <li key={comment.id} className="p-2 bg-white">
                  <strong>{comment.product} :</strong>
                  <p>{comment.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
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
